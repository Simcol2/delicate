from PIL import Image
import os

# Optimize the large background images
images_to_optimize = [
    ("public/images/Gemini_Generated_Image_7pemq97pemq97pem.png", "public/images/hero-bg-optimized.jpg", 1920),
    ("public/images/Gemini_Generated_Image_ffk17uffk17uffk1.png", "public/images/hero-bg-alt-optimized.jpg", 1920),
]

for input_path, output_path, max_width in images_to_optimize:
    if os.path.exists(input_path):
        img = Image.open(input_path)
        
        # Convert to RGB if necessary
        if img.mode in ('RGBA', 'P'):
            img = img.convert('RGB')
        
        # Calculate new size maintaining aspect ratio
        width, height = img.size
        if width > max_width:
            ratio = max_width / width
            new_size = (max_width, int(height * ratio))
            img = img.resize(new_size, Image.Resampling.LANCZOS)
        
        # Save as JPEG with quality 85
        img.save(output_path, 'JPEG', quality=85, optimize=True)
        
        original_size = os.path.getsize(input_path) / 1024
        new_size = os.path.getsize(output_path) / 1024
        print(f"Optimized {input_path}: {original_size:.0f}KB -> {new_size:.0f}KB")
    else:
        print(f"File not found: {input_path}")
