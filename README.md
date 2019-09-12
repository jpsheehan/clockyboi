# Clock Tower Voting Booth

A proof of concept web-based voting platform for interacting with an Arduino via serial communications.

## Description

When run, the HTTP server will accept connections on http://localhost:8080/ and will send the characters 'r', 'g', or 'b' followed by a newline to the specified serial device. The serial device should be configured to operate at 9600 baud with no parity bit.

## Usage

```bash
python server.py device
```

Device can be any COM port (on Windows) or /dev path (Linux) or "NULL" if you don't want to use a serial device.

## Example

```bash
python server.py COM1
```