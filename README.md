# Clock Tower Voting Booth

_Written by JP Sheehan. Licensed under the GPLv3._

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

## Known Issues

- The HTTP server is based on Python's HTTPServer implementation, this is not recommended for production.
- The user's vote is stored in local storage on the browser. This is not a fantastic way of preventing users from voting more than once.
