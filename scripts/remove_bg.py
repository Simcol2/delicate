from PIL import Image
import sys

# Open the image
input_path = "public/images/DF Logo.jpeg"
output_path = "public/images/df-logo.png"

img = Image.open(input_path)
img = img.convert("RGBA")

# Get the background color (cream/off-white from top-left corner)
width, height = img.size
bg_color = img.getpixel((10, 10))
print(f"Background color sample: {bg_color}")

# Create new image with transparency
new_img = Image.new("RGBA", img.size, (0, 0, 0, 0))

# Threshold for background detection
threshold = 35

for x in range(width):
    for y in range(height):
        r, g, b, a = img.getpixel((x, y))
        
        # Check if pixel is similar to background (cream color)
        # The background is around (235, 230, 215) based on visual inspection
        is_bg = (
            abs(r - bg_color[0]) < threshold and
            abs(g - bg_color[1]) < threshold and
            abs(b - bg_color[2]) < threshold
        )
        
        if is_bg:
            new_img.putpixel((x, y), (0, 0, 0, 0))  # Transparent
        else:
            new_img.putpixel((x, y), (r, g, b, 255))  # Keep color

# Save the result
new_img.save(output_path)
print(f"Saved transparent logo to: {output_path}")
