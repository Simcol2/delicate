#!/usr/bin/env python3
"""
Convert HEIC images to JPEG and compress large images for web use.
"""

import os
from pathlib import Path
from PIL import Image
from pillow_heif import register_heif_opener

# Register HEIF opener with PIL
register_heif_opener()

# Configuration
PHOTO_SLIDES_DIR = Path("public/Photo Slides")
MAX_WIDTH = 1920  # Max width for large images
MAX_HEIGHT = 1080  # Max height for large images
JPEG_QUALITY = 85  # Good balance between quality and size

def convert_heic_to_jpeg(heic_path):
    """Convert a HEIC file to JPEG."""
    jpeg_path = heic_path.with_suffix('.jpg')
    
    try:
        with Image.open(heic_path) as img:
            # Convert to RGB if necessary (HEIC might have transparency)
            if img.mode in ('RGBA', 'P'):
                img = img.convert('RGB')
            
            # Resize if too large
            img = resize_if_needed(img)
            
            # Save as JPEG
            img.save(jpeg_path, 'JPEG', quality=JPEG_QUALITY, optimize=True)
        
        print(f"[OK] Converted: {heic_path.name} -> {jpeg_path.name}")
        
        # Get file sizes for comparison
        heic_size = heic_path.stat().st_size / (1024 * 1024)
        jpeg_size = jpeg_path.stat().st_size / (1024 * 1024)
        print(f"     Size: {heic_size:.2f}MB -> {jpeg_size:.2f}MB")
        
        return jpeg_path.name
    except Exception as e:
        print(f"[ERR] Error converting {heic_path}: {e}")
        return None

def compress_image(image_path):
    """Compress a large image file."""
    try:
        with Image.open(image_path) as img:
            original_size = image_path.stat().st_size / (1024 * 1024)
            
            # Check if image needs resizing
            img = resize_if_needed(img)
            
            # Save with compression
            if image_path.suffix.lower() in ['.jpg', '.jpeg']:
                img.save(image_path, 'JPEG', quality=JPEG_QUALITY, optimize=True)
            elif image_path.suffix.lower() == '.png':
                img.save(image_path, 'PNG', optimize=True)
            
            new_size = image_path.stat().st_size / (1024 * 1024)
            
            if abs(original_size - new_size) > 0.01:  # Only report if size changed
                print(f"[OK] Compressed: {image_path.name}")
                print(f"     Size: {original_size:.2f}MB -> {new_size:.2f}MB")
    except Exception as e:
        print(f"[ERR] Error compressing {image_path}: {e}")

def resize_if_needed(img):
    """Resize image if it exceeds max dimensions."""
    width, height = img.size
    
    if width > MAX_WIDTH or height > MAX_HEIGHT:
        # Calculate scaling factor
        scale_w = MAX_WIDTH / width
        scale_h = MAX_HEIGHT / height
        scale = min(scale_w, scale_h)
        
        new_width = int(width * scale)
        new_height = int(height * scale)
        
        img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
        print(f"     Resized: {width}x{height} -> {new_width}x{new_height}")
    
    return img

def main():
    heic_files = []
    large_files = []
    
    # Find all image files
    for root, dirs, files in os.walk(PHOTO_SLIDES_DIR):
        for file in files:
            file_path = Path(root) / file
            
            # Collect HEIC files
            if file.lower().endswith('.heic'):
                heic_files.append(file_path)
            # Collect large files (> 500KB)
            elif file_path.stat().st_size > 500 * 1024:
                large_files.append(file_path)
    
    print(f"Found {len(heic_files)} HEIC files to convert")
    print(f"Found {len(large_files)} large files to compress")
    print("=" * 50)
    
    # Convert HEIC files
    conversion_map = {}
    for heic_path in heic_files:
        jpeg_name = convert_heic_to_jpeg(heic_path)
        if jpeg_name:
            conversion_map[heic_path.name] = jpeg_name
            # Remove original HEIC file after successful conversion
            heic_path.unlink()
            print(f"     Removed original: {heic_path.name}")
    
    print("\n" + "=" * 50)
    
    # Compress large files (excluding HEIC originals which are now deleted)
    for image_path in large_files:
        if not str(image_path).lower().endswith('.heic'):
            compress_image(image_path)
    
    print("\n" + "=" * 50)
    print("Conversion complete!")
    
    # Print summary for updating code
    if conversion_map:
        print("\nUpdate your code with these file replacements:")
        for old, new in conversion_map.items():
            print(f"  {old} -> {new}")

if __name__ == "__main__":
    main()
