"""Automated download and extraction utility for the UCI Forest Covertype dataset.
"""

import os
import shutil
import urllib.request
import zipfile
import gzip

DATA_URL = 'https://archive.ics.uci.edu/static/public/31/covertype.zip'
ZIP_PATH = 'covertype.zip'
GZ_PATH = 'covtype.data.gz'
DATA_PATH = 'covtype.data'
CSV_PATH = 'covtype_with_header.csv'

FEATURE_COLUMNS = [
    'Elevation', 'Aspect', 'Slope',
    'Horizontal_Distance_To_Hydrology', 'Vertical_Distance_To_Hydrology',
    'Horizontal_Distance_To_Roadways',
    'Hillshade_9am', 'Hillshade_Noon', 'Hillshade_3pm',
    'Horizontal_Distance_To_Fire_Points'
] + [f'Wilderness_Area_{i}' for i in range(1, 5)] + [f'Soil_Type_{i}' for i in range(1, 41)] + ['Cover_Type']

def download_and_extract():
    if not os.path.exists(ZIP_PATH):
        print(f"Downloading from {DATA_URL}...")
        req = urllib.request.Request(DATA_URL, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as resp, open(ZIP_PATH, 'wb') as f:
            shutil.copyfileobj(resp, f)
        print(f"Downloaded {ZIP_PATH} ({os.path.getsize(ZIP_PATH):,} bytes)")

    if not os.path.exists(GZ_PATH):
        print("Extracting zip archive...")
        with zipfile.ZipFile(ZIP_PATH, 'r') as z:
            z.extractall('.')
        print("Extracted zip archive.")

    if not os.path.exists(DATA_PATH) and os.path.exists(GZ_PATH):
        print("Decompressing covtype.data.gz...")
        with gzip.open(GZ_PATH, 'rb') as f_in, open(DATA_PATH, 'wb') as f_out:
            shutil.copyfileobj(f_in, f_out)
        print(f"Decompressed {DATA_PATH} ({os.path.getsize(DATA_PATH):,} bytes)")

    if not os.path.exists(CSV_PATH) and os.path.exists(DATA_PATH):
        print(f"Adding headers to create {CSV_PATH}...")
        with open(DATA_PATH, 'r') as fin, open(CSV_PATH, 'w', newline='') as fout:
            fout.write(','.join(FEATURE_COLUMNS) + '\n')
            for line in fin:
                fout.write(line)
        print(f"Created {CSV_PATH} ({os.path.getsize(CSV_PATH):,} bytes)")

    print("\nDataset ready for analysis!")

if __name__ == '__main__':
    download_and_extract()
