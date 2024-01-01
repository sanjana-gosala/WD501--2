const http = require("http");
const fs = require("fs");

let homeContent = "";
let projectContent = "";
let registrationContent = "";
let port = 3000; 


process.argv.forEach((arg) => {
    if (arg.startsWith("--port=")) {
        const portNumber = arg.split("=")[1];
        port = parseInt(portNumber);
    }
});

fs.readFile("home.html", (err, home) => {
    if (err) {
        throw err;
    }
    homeContent = home;
});

fs.readFile("project.html", (err, project) => {
    if (err) {
        throw err;
    }
    projectContent = project;
});

fs.readFile("registration.html", (err, registration) => {
    if (err) {
        throw err;
    }
    registrationContent = registration;
});

http.createServer((request, response) => {
    let url = request.url;
    response.writeHead(200, { "Content-Type": "text/html" });
    switch (url) {
        case "/project":
            response.write(projectContent);
            response.end();
            break;
        case "/registration":
            response.write(registrationContent);
            response.end();
            break;
        default:
            response.write(homeContent);
            response.end();
            break;
    }
}).listen(port, () => {
        console.log(`Server running at http://localhost:${port}/`);
    
});
