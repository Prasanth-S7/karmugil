import serial
import pymongo

client = pymongo.MongoClient("mongodb+srv://sai:sai123Sai@cluster0.qcpd6.mongodb.net/")

db = client["Soonu"] 
collection = db["NunDat"]

#print(collection.find_one({"Station": "Alice"}))

# Replace 'COM3' with your serial port name. For Linux, it might be '/dev/ttyUSB0'
port = 'COM5'  # Example for Windows
baudrate = 9600  # This should match the baudrate used in the Arduino code

try:
    # Initialize serial connection
    ser = serial.Serial(port, baudrate, timeout=1)

    print(f"Connected to {port} at {baudrate} baudrate.")

    while True:
        # Read data from the serial port
        if ser.in_waiting > 0:
            line = ser.readline().decode('utf-8').rstrip()
            l = line.split(':')
            if len(l)>3 :
                rainmm = l[2].split(' | ')[0]
                hour = l[-1]
                print(rainmm, hour)
                collection.update_many({'Station': "Chennai nungambakkam"},{"$set": {"hr"+str(hour): rainmm}})
except serial.SerialException as e:
    print(f"Error: {e}")
except KeyboardInterrupt:
    print("\nExiting...")
finally:
    # Close the serial connection
    ser.close()
    print(f"Disconnected from {port}.")
