# Clock Tower Voting Booth

A proof of concept web-based voting platform for interacting with an Arduino via serial communications.

## Description

When run, the server will accept connections on port http://localhost:8080/ and will send the characters 'r', 'g', or 'b' to the specified serial port (at 9600 baud) followed by a newline.

## Usage

```bash
python server.py <comport>
```

## Example

```bash
python server.py COM1
```
