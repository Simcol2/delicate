from PIL import Image
import sys

# Open the image
input_path = "public/images/DF Logo.jpeg"
output_path = "public/images/df-logo.png"

img = Image.open(input_path)
img = img.convert("RGBA")

width, height = img.size

# Create new image with transparency
new_img = Image.new("RGBA", img.size, (0, 0, 0, 0))

# Sample multiple background points to get better color range
bg_samples = [
    (0, 0),
    (width-1, 0),
    (0, height-1),
    (width-1, height-1),
    (width//2, 0),
    (0, height//2),
    (width-1, height//2),
    (width//2, height-1),
]

bg_colors = [img.getpixel((x, y)) for x, y in bg_samples]
print(f"Background samples: {bg_colors}")

# Threshold for background detection - more aggressive
threshold = 50

def is_background_pixel(r, g, b):
    # Check against all sampled background colors
    for bg in bg_colors:
        if (abs(r - bg[0]) < threshold and
            abs(g - bg[1]) < threshold and
            abs(b - bg[2]) < threshold):
            return True
    
    # Also check for light cream/beige tones generally
    # Background is cream colored - high R, G slightly lower, B lower still
    if r > 220 and g > 210 and b > 190:
        return True
    if r > 230 and g > 225 and b > 200:
        return True
        
    return False

for x in range(width):
    for y in range(height):
        r, g, b, a = img.getpixel((x, y))
        
        if is_background_pixel(r, g, b):
            new_img.putpixel((x, y), (0, 0, 0, 0))  # Transparent
        else:
            new_img.putpixel((x, y), (r, g, b, 255))  # Keep color

# Save the result
new_img.save(output_path)
print(f"Saved cleaned logo to: {output_path}")
