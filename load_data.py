import csv
import sys

FEATURE_COLUMNS = [
    'Elevation', 'Aspect', 'Slope',
    'Horizontal_Distance_To_Hydrology', 'Vertical_Distance_To_Hydrology',
    'Horizontal_Distance_To_Roadways',
    'Hillshade_9am', 'Hillshade_Noon', 'Hillshade_3pm',
    'Horizontal_Distance_To_Fire_Points'
] + [f'Wilderness_Area_{i}' for i in range(1, 5)] + [f'Soil_Type_{i}' for i in range(1, 41)]

TARGET_COLUMN = 'Cover_Type'
ALL_COLUMNS = FEATURE_COLUMNS + [TARGET_COLUMN]

COVER_TYPES = {
    1: 'Spruce/Fir',
    2: 'Lodgepole Pine',
    3: 'Ponderosa Pine',
    4: 'Cottonwood/Willow',
    5: 'Aspen',
    6: 'Douglas-fir',
    7: 'Krummholz'
}

WILDERNESS_AREAS = {
    'Wilderness_Area_1': 'Rawah',
    'Wilderness_Area_2': 'Neota',
    'Wilderness_Area_3': 'Comanche Peak',
    'Wilderness_Area_4': 'Cache la Poudre'
}

def load_with_pandas(csv_path='covtype_with_header.csv'):
    """Load the Covertype dataset as a pandas DataFrame if pandas is installed."""
    import pandas as pd
    return pd.read_csv(csv_path)

def inspect_summary(csv_path='covtype_with_header.csv'):
    """Quick summary using the standard library."""
    from collections import Counter
    target_counts = Counter()
    total_rows = 0

    with open(csv_path, 'r') as f:
        reader = csv.reader(f)
        header = next(reader)
        for row in reader:
            total_rows += 1
            target_counts[int(row[-1])] += 1

    print(f"Total observations: {total_rows}")
    print(f"Total features: {len(header) - 1} (Total columns: {len(header)})")
    print("\nSplits as structured in dataset (Blackard & Dean 1999):")
    print(" - Train:       11,340 (Rows 1 to 11,340: 1,620 per class)")
    print(" - Validation:   3,780 (Rows 11,341 to 15,120: 540 per class)")
    print(" - Test:       565,892 (Rows 15,121 to 581,012)")
    print("\nCover type counts across dataset:")
    for code in range(1, 8):
        print(f"  {code}. {COVER_TYPES[code]:<18}: {target_counts[code]:>7} ({target_counts[code]/total_rows*100:5.2f}%)")

if __name__ == '__main__':
    try:
        import pandas as pd
        df = load_with_pandas('covtype_with_header.csv')
        print(f"Loaded with pandas: shape = {df.shape}")
    except ImportError:
        print("Note: pandas not installed; running standard library inspector:")
        inspect_summary('covtype_with_header.csv')

