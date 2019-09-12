import sys
import serial
import serial.tools.list_ports
from http.server import HTTPServer, BaseHTTPRequestHandler

# You must install pyserial first!
# pip install pyserial

networkPort = 8080

serialPort = None


class VotingHTTPRequestHandler(BaseHTTPRequestHandler):

    def do_GET(self):
        if self.path == "/":
            self.serve_file("index.html")
        elif self.path == "/web.js":
            self.serve_file("web.js")
        elif self.path == "/style.css":
            self.serve_file("style.css")
        else:
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b"404 Document Not Found")

    def do_POST(self):
        if self.path == "/vote":
            data = self.rfile.read(
                int(self.headers['Content-Length'])).decode("utf8")
            splits = data.split("=")
            if splits[0] == "colour":
                colour = splits[1]
                if colour == "red":
                    self.send_response(200)
                    self.send_character("r")
                elif colour == "green":
                    self.send_response(200)
                    self.send_character("g")
                elif colour == "blue":
                    self.send_response(200)
                    self.send_character("b")
                else:
                    self.send_response(400)
            self.end_headers()
            self.wfile.write(b"")

        else:
            self.send_response(404)
            self.end_headers()

    def serve_file(self, filename):
        self.send_response(200)
        self.end_headers()
        f = open(filename, "rb")
        self.wfile.write(f.read())
        f.close()

    def send_character(self, c):
        print(self.client_address[0] + ":" +
              str(self.client_address[1]), "voted for", c)
        if serialPort is not None:
            serialPort.write((c + "\n").encode("utf8"))


def main():

    global serialPort

    if len(sys.argv) == 2:
        serialPortName = sys.argv[1]

        if serialPortName.upper() != "NULL":
            print("Using device", serialPortName)
            serialPort = serial.Serial(
                sys.argv[1], 9600, parity=serial.PARITY_NONE)
        else:
            print("Using dummy serial device")
            serialPort = None

        httpd = HTTPServer(('localhost', networkPort),
                           VotingHTTPRequestHandler)
        print("Serving on http://localhost:" + str(networkPort) + "/")
        httpd.serve_forever()
        serialPort.close()
    else:
        print("Usage: python server.py device")
        ports = serial.tools.list_ports.comports()
        if len(ports) == 0:
            print("Please plug in an serial device or specify 'NULL'.")
        else:
            print("You must specify a device. Detected devices:")
            print("  - NULL")
            for p in ports:
                print("  -", p.device)


if __name__ == "__main__":
    main()
