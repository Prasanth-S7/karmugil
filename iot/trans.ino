#include <SPI.h>
#include <LoRa.h>

const int hallPin = 3; 
const float mmPerPulse = 0.173;  
float rainfallMM = 0;  
int previousState = LOW;

unsigned long previousMillis = 0;  
const long interval = 5000;  // Interval for LoRa transmission

int counter = 1;  // Start the counter at 1

void setup() {
  Serial.begin(9600);
  while (!Serial);

  Serial.println("LoRa Transmitter");

  if (!LoRa.begin(433E6)) {  
    Serial.println("Starting LoRa failed!");
    while (1);
  }

  pinMode(hallPin, INPUT);  
}

void loop() {
  // Hall effect sensor calculation
  int currentState = digitalRead(hallPin); 
  if (currentState != previousState && currentState == HIGH) {
    rainfallMM += mmPerPulse;  
  }
  previousState = currentState;

  // Get the current time
  unsigned long currentMillis = millis();

  // Check if the time interval has passed
  if (currentMillis - previousMillis >= interval) {
    previousMillis = currentMillis;  // Save the last time you sent a packet

    // LoRa transmission
    LoRa.beginPacket();
    LoRa.print("Rainfall (mm): ");
    LoRa.print(rainfallMM);
    LoRa.print(" | Counter: ");
    LoRa.print(counter);  // Send the counter value
    LoRa.endPacket();

    // Debugging information
    Serial.print("Sent Rainfall (mm): ");
    Serial.print(rainfallMM);
    Serial.print(" | Counter: ");
    Serial.println(counter);  // Print the counter value

    // Increment and reset the counter after reaching 24
    counter++;
    if (counter > 24) {
      counter = 1;
    }
  }
}
