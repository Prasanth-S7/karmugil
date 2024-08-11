#include <SPI.h>
#include <LoRa.h>

void setup() {
  Serial.begin(9600);
  while (!Serial);

  Serial.println("LoRa Receiver");

  if (!LoRa.begin(433E6)) {  // Initialize LoRa at 433 MHz
    Serial.println("Starting LoRa failed!");
    while (1);
  }
}

void loop() {
  // Try to parse a LoRa packet
  int packetSize = LoRa.parsePacket();
  if (packetSize) {
    // Received a packet
    Serial.print("Received packet: ");

    // Read the packet
    String received = "";
    while (LoRa.available()) {
      received += (char)LoRa.read();
    }

    // Print the received data
    Serial.println(received);

  }
}
