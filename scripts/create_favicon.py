from PIL import Image

# Open the logo
logo_path = "public/images/df-logo.png"
output_path = "app/icon.png"

img = Image.open(logo_path)
img = img.convert("RGBA")

# Get the bounding box of the actual content (non-transparent pixels)
bbox = img.getbbox()
if bbox:
    # Crop to content
    img = img.crop(bbox)

# Create a square canvas
width, height = img.size
size = max(width, height)

# Create square image with transparent background
square = Image.new("RGBA", (size, size), (0, 0, 0, 0))

# Paste the image centered
x = (size - width) // 2
y = (size - height) // 2
square.paste(img, (x, y), img)

# Resize to favicon sizes (Next.js uses 32x32 for favicon, but icon.png can be larger)
# We'll create a 180x180 icon.png which works well for most use cases
favicon = square.resize((180, 180), Image.Resampling.LANCZOS)

# Save
favicon.save(output_path)
print(f"Created favicon at: {output_path}")
