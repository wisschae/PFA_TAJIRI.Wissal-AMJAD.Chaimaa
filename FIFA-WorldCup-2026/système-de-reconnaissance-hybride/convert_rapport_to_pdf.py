"""
Script pour convertir le rapport Markdown en PDF
Utilise markdown et pdfkit (ou weasyprint)
"""
import sys
import os
from pathlib import Path

# Essayer d'importer les bibliothèques nécessaires
try:
    import markdown
    from weasyprint import HTML
    HAS_WEASYPRINT = True
except ImportError:
    HAS_WEASYPRINT = False

try:
    import pdfkit
    HAS_PDFKIT = True
except ImportError:
    HAS_PDFKIT = False

# Chemins
rapport_md = r"C:\Users\PC\.gemini\antigravity\brain\675b62d3-77e9-47a1-bcc9-1a8b1744f138\RAPPORT_SUIVI_09DEC2024.md"
output_pdf = r"C:\Users\PC\OneDrive\Desktop\Chaimaa\5IIR\projet PFA\Système de reconnaissance hybride\RAPPORT_SUIVI_09DEC2024.pdf"

def convert_with_weasyprint():
    """Convertir avec WeasyPrint (meilleur rendu)"""
    print("📄 Conversion avec WeasyPrint...")
    
    # Lire le markdown
    with open(rapport_md, 'r', encoding='utf-8') as f:
        md_content = f.read()
    
    # Convertir en HTML
    html_content = markdown.markdown(
        md_content,
        extensions=['tables', 'fenced_code', 'codehilite']
    )
    
    # Ajouter CSS pour meilleur rendu
    full_html = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body {{
                font-family: 'Segoe UI', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 900px;
                margin: 40px auto;
                padding: 20px;
            }}
            h1 {{
                color: #2563eb;
                border-bottom: 3px solid #2563eb;
                padding-bottom: 10px;
                margin-top: 30px;
            }}
            h2 {{
                color: #1e40af;
                margin-top: 25px;
                border-bottom: 1px solid #ddd;
                padding-bottom: 5px;
            }}
            h3 {{
                color: #3b82f6;
                margin-top: 20px;
            }}
            table {{
                border-collapse: collapse;
                width: 100%;
                margin: 20px 0;
            }}
            th, td {{
                border: 1px solid #ddd;
                padding: 12px;
                text-align: left;
            }}
            th {{
                background-color: #2563eb;
                color: white;
            }}
            code {{
                background-color: #f3f4f6;
                padding: 2px 6px;
                border-radius: 3px;
                font-family: 'Courier New', monospace;
            }}
            pre {{
                background-color: #1f2937;
                color: #f3f4f6;
                padding: 15px;
                border-radius: 5px;
                overflow-x: auto;
            }}
            pre code {{
                background-color: transparent;
                color: inherit;
            }}
            blockquote {{
                border-left: 4px solid #2563eb;
                padding-left: 20px;
                margin-left: 0;
                color: #555;
            }}
            .mermaid {{
                background-color: #f9fafb;
                padding: 20px;
                border-radius: 5px;
                margin: 20px 0;
            }}
        </style>
    </head>
    <body>
        {html_content}
    </body>
    </html>
    """
    
    # Convertir HTML en PDF
    HTML(string=full_html).write_pdf(output_pdf)
    print(f"✅ PDF créé : {output_pdf}")
    return True

def convert_with_pdfkit():
    """Convertir avec pdfkit (nécessite wkhtmltopdf)"""
    print("📄 Conversion avec pdfkit...")
    
    with open(rapport_md, 'r', encoding='utf-8') as f:
        md_content = f.read()
    
    html_content = markdown.markdown(md_content, extensions=['tables', 'fenced_code'])
    
    pdfkit.from_string(html_content, output_pdf)
    print(f"✅ PDF créé : {output_pdf}")
    return True

def main():
    print("🚀 Conversion Markdown → PDF")
    print(f"📁 Source : {rapport_md}")
    print(f"📁 Destination : {output_pdf}")
    print()
    
    # Vérifier que le fichier source existe
    if not os.path.exists(rapport_md):
        print(f"❌ Erreur : Le fichier {rapport_md} n'existe pas !")
        return 1
    
    # Essayer WeasyPrint d'abord (meilleur rendu)
    if HAS_WEASYPRINT:
        try:
            convert_with_weasyprint()
            return 0
        except Exception as e:
            print(f"❌ Erreur WeasyPrint : {e}")
    
    # Essayer pdfkit
    if HAS_PDFKIT:
        try:
            convert_with_pdfkit()
            return 0
        except Exception as e:
            print(f"❌ Erreur pdfkit : {e}")
    
    # Aucune bibliothèque disponible
    print("❌ Aucune bibliothèque de conversion PDF disponible !")
    print()
    print("📥 Installation requise :")
    print("   pip install weasyprint")
    print("   OU")
    print("   pip install pdfkit markdown")
    return 1

if __name__ == "__main__":
    sys.exit(main())
