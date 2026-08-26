param(
  [Parameter(Mandatory = $true)][string]$InputPath,
  [Parameter(Mandatory = $true)][string]$OutputPath,
  [int]$MinimumChannel = 210,
  [int]$MaximumSpread = 28,
  [switch]$GlobalBackground
)

Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies 'System.Drawing' -TypeDefinition @'
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

public static class EdgeBackgroundRemover
{
    public static void Remove(string inputPath, string outputPath, int minimumChannel, int maximumSpread, bool globalBackground)
    {
        using (var source = new Bitmap(inputPath))
        using (var image = new Bitmap(source.Width, source.Height, PixelFormat.Format32bppArgb))
        {
            using (var graphics = Graphics.FromImage(image))
                graphics.DrawImageUnscaled(source, 0, 0);

            var bounds = new Rectangle(0, 0, image.Width, image.Height);
            var data = image.LockBits(bounds, ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
            var bytes = new byte[Math.Abs(data.Stride) * image.Height];
            Marshal.Copy(data.Scan0, bytes, 0, bytes.Length);

            var visited = new bool[image.Width * image.Height];
            var queue = new Queue<int>();

            Action<int, int> enqueue = (x, y) =>
            {
                var index = y * image.Width + x;
                if (visited[index]) return;
                var offset = y * data.Stride + x * 4;
                var b = bytes[offset];
                var g = bytes[offset + 1];
                var r = bytes[offset + 2];
                var max = Math.Max(r, Math.Max(g, b));
                var min = Math.Min(r, Math.Min(g, b));
                if (min < minimumChannel || max - min > maximumSpread) return;
                visited[index] = true;
                queue.Enqueue(index);
            };

            if (globalBackground)
            {
                for (var y = 0; y < image.Height; y++)
                    for (var x = 0; x < image.Width; x++)
                        enqueue(x, y);
            }
            else
            {
                for (var x = 0; x < image.Width; x++)
                {
                    enqueue(x, 0);
                    enqueue(x, image.Height - 1);
                }
                for (var y = 0; y < image.Height; y++)
                {
                    enqueue(0, y);
                    enqueue(image.Width - 1, y);
                }
            }

            while (queue.Count > 0)
            {
                var index = queue.Dequeue();
                var x = index % image.Width;
                var y = index / image.Width;
                var offset = y * data.Stride + x * 4;
                bytes[offset + 3] = 0;
                if (x > 0) enqueue(x - 1, y);
                if (x + 1 < image.Width) enqueue(x + 1, y);
                if (y > 0) enqueue(x, y - 1);
                if (y + 1 < image.Height) enqueue(x, y + 1);
            }

            Marshal.Copy(bytes, 0, data.Scan0, bytes.Length);
            image.UnlockBits(data);
            image.Save(outputPath, ImageFormat.Png);
        }
    }
}
'@

$resolvedInput = (Resolve-Path -LiteralPath $InputPath).Path
$resolvedOutput = [System.IO.Path]::GetFullPath($OutputPath)
[System.IO.Directory]::CreateDirectory([System.IO.Path]::GetDirectoryName($resolvedOutput)) | Out-Null
[EdgeBackgroundRemover]::Remove($resolvedInput, $resolvedOutput, $MinimumChannel, $MaximumSpread, $GlobalBackground.IsPresent)
