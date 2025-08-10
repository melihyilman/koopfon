#!/bin/bash

# Koopfon Production Build Script
echo "🚀 Building Koopfon Landing Page..."

# Build the project
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Create/clear production directory
    PROD_DIR="/Users/melih/dev/koopfon/koopfon-production"
    rm -rf "$PROD_DIR"
    mkdir -p "$PROD_DIR"
    
    # Copy all built files
    cp -r out/* "$PROD_DIR/"
    
    # Add .htaccess for Apache
    cat > "$PROD_DIR/.htaccess" << 'EOF'
RewriteEngine On

# Handle Next.js trailing slashes
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^([^\.]+)/?$ $1.html [NC,L]

# Security headers
<IfModule mod_headers.c>
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options DENY
    Header always set X-XSS-Protection "1; mode=block"
    Header always set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
EOF
    
    # Add robots.txt
    cat > "$PROD_DIR/robots.txt" << 'EOF'
User-agent: *
Allow: /

Sitemap: https://koopfon.com/sitemap.xml
EOF
    
    # Add sitemap.xml with current date
    CURRENT_DATE=$(date +%Y-%m-%d)
    cat > "$PROD_DIR/sitemap.xml" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://koopfon.com/</loc>
    <lastmod>$CURRENT_DATE</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://koopfon.com/hakkimizda/</loc>
    <lastmod>$CURRENT_DATE</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://koopfon.com/kooperatif-kurmak-icin-ortak-ariyoruz/</loc>
    <lastmod>$CURRENT_DATE</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>
EOF
    
    echo "✅ Production files ready at: $PROD_DIR"
    echo "📁 Files count: $(find "$PROD_DIR" -type f | wc -l)"
    
    # Create ZIP for cPanel upload
    ZIP_FILE="/Users/melih/dev/koopfon/koopfon-website-$(date +%Y%m%d-%H%M%S).zip"
    cd "$PROD_DIR"
    zip -r "$ZIP_FILE" .
    
    echo ""
    echo "📦 ZIP created: $ZIP_FILE"
    echo "📊 ZIP size: $(ls -lh "$ZIP_FILE" | awk '{print $5}')"
    echo ""
    echo "🌐 cPanel Upload Instructions:"
    echo "   1. Login to cPanel File Manager"
    echo "   2. Go to public_html folder"
    echo "   3. Upload: $ZIP_FILE"
    echo "   4. Extract the zip file"
    echo "   5. Delete the zip file after extraction"
    echo ""
    echo "🚀 Alternative: Direct server upload"
    echo "   rsync -av $PROD_DIR/ user@server:/var/www/html/"
    
else
    echo "❌ Build failed!"
    exit 1
fi