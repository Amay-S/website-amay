import os
import sys
from ftplib import FTP

FTP_HOST = os.environ.get("FTP_SERVER", "195.35.39.64")
FTP_USER = os.environ.get("FTP_USERNAME", "u853654182.heyitsamay.com")
FTP_PASS = os.environ.get("FTP_PASSWORD", "Payal@1975")
FTP_PORT = 21
LOCAL_DIR = "./out"
REMOTE_DIR = "public_html"

CREATED_DIRS = set()

def connect_ftp():
    print(f"Connecting to FTP server {FTP_HOST}:{FTP_PORT}...")
    ftp = FTP()
    ftp.connect(FTP_HOST, FTP_PORT, timeout=30)
    ftp.login(FTP_USER, FTP_PASS)
    # Enable passive mode
    ftp.set_pasv(True)
    print("Logged in successfully.")
    return ftp

def ensure_remote_dir(ftp, dir_path):
    if dir_path in CREATED_DIRS:
        return
    parts = dir_path.strip("/").split("/")
    current = ""
    for part in parts:
        if not part:
            continue
        current = f"{current}/{part}" if current else part
        abs_current = f"/{current}"
        if abs_current in CREATED_DIRS:
            continue
        try:
            ftp.cwd(abs_current)
            CREATED_DIRS.add(abs_current)
        except Exception:
            print(f"Creating remote directory: {abs_current}")
            try:
                ftp.mkd(abs_current)
                ftp.cwd(abs_current)
                CREATED_DIRS.add(abs_current)
            except Exception as e:
                print(f"Failed to create directory {abs_current}: {e}")
                raise e
    ftp.cwd("/")

def upload_file(ftp, local_path, remote_path):
    print(f"Uploading: {local_path} -> {remote_path}")
    # Ensure parent directories exist
    parent_dir = os.path.dirname(remote_path)
    if parent_dir and parent_dir != "/":
        ensure_remote_dir(ftp, parent_dir)
    
    with open(local_path, "rb") as f:
        # We prefix the remote path with / to ensure it is absolute from the root
        abs_remote_path = f"/{remote_path.lstrip('/')}"
        ftp.storbinary(f"STOR {abs_remote_path}", f)

def upload_dir_recursive(ftp, local_base, local_current, remote_base):
    for entry in os.listdir(local_current):
        local_path = os.path.join(local_current, entry)
        rel_path = os.path.relpath(local_path, local_base)
        remote_path = f"{remote_base}/{rel_path.replace(os.sep, '/')}"

        if os.path.isdir(local_path):
            upload_dir_recursive(ftp, local_base, local_path, remote_base)
        else:
            upload_file(ftp, local_path, remote_path)

def main():
    if not os.path.exists(LOCAL_DIR):
        print(f"Error: Build folder '{LOCAL_DIR}' does not exist.")
        sys.exit(1)

    ftp = None
    try:
        ftp = connect_ftp()
        print(f"Starting deployment from '{LOCAL_DIR}' to remote '{REMOTE_DIR}'...")
        upload_dir_recursive(ftp, LOCAL_DIR, LOCAL_DIR, REMOTE_DIR)
        print("\nDeployment completed successfully!")
    except Exception as e:
        print(f"\nDeployment failed: {e}")
        sys.exit(1)
    finally:
        if ftp:
            try:
                ftp.quit()
            except Exception:
                pass

if __name__ == "__main__":
    main()
