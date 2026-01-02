"""
Script simple pour copier le rapport MD dans le dossier projet
et donner des instructions pour conversion PDF
"""
import shutil
import os

# Chemins
source_md = r"C:\Users\PC\.gemini\antigravity\brain\675b62d3-77e9-47a1-bcc9-1a8b1744f138\RAPPORT_SUIVI_09DEC2024.md"
dest_md = r"C:\Users\PC\OneDrive\Desktop\Chaimaa\5IIR\projet PFA\Système de reconnaissance hybride\RAPPORT_SUIVI_09DEC2024.md"

print("📄 Copie du rapport dans le dossier projet...")

try:
    shutil.copy2(source_md, dest_md)
    print(f"✅ Rapport copié : {dest_md}")
    print()
    print("📝 POUR CONVERTIR EN PDF :")
    print()
    print("Option 1 (RECOMMANDÉE) - Utiliser Word/LibreOffice :")
    print("   1. Ouvrir le fichier RAPPORT_SUIVI_09DEC2024.md avec Word ou LibreOffice")
    print("   2. Fichier → Enregistrer sous → Format PDF")
    print()
    print("Option 2 - Utiliser un convertisseur en ligne :")
    print("   1. https://www.markdowntopdf.com/")
    print("   2. Uploader RAPPORT_SUIVI_09DEC2024.md")
    print("   3. Télécharger le PDF")
    print()
    print("Option 3 - Utiliser VSCode (si installé) :")
    print("   1. Installer extension 'Markdown PDF'")
    print("   2. Ouvrir RAPPORT_SUIVI_09DEC2024.md")
    print("   3. Ctrl+Shift+P → 'Markdown PDF: Export (pdf)'")
    
except Exception as e:
    print(f"❌ Erreur : {e}")

