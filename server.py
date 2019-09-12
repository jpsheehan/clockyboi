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
            self.send_response(200)
            self.end_headers()
            f = open("index.html", "rb")
            self.wfile.write(f.read())
            f.close()

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

    def send_character(self, c):
        print("Someone voted for", c)
        serialPort.write((c + "\n").encode("utf8"))


def main():

    global serialPort

    if len(sys.argv) == 2:
        serialPort = serial.Serial(sys.argv[1], 9600)
        httpd = HTTPServer(('localhost', networkPort),
                           VotingHTTPRequestHandler)
        print("Serving on http://localhost:" + str(networkPort) + "/")
        httpd.serve_forever()
        serialPort.close()
    else:
        print("Usage:", sys.argv[0], "port")
        ports = serial.tools.list_ports.comports()
        if len(ports) == 0:
            print("Please plug in an Arduino!")
        else:
            print("port must be one of", ", ".join(ports))


if __name__ == "__main__":
    main()
