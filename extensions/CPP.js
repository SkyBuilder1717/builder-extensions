(async function (Scratch) {
    if (!Scratch.extensions.unsandboxed) {
        alert("This extension needs to be unsandboxed to run!");
        return;
    }

    class Extension {
        getInfo() {
            return {
                id: "cpp",
                name: "C++",
                color1: "#414da4",
                color2: "#4000b8",
                blocks: [
                    {
                        opcode: "runCpp",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "run C++ code [CODE]",
                        arguments: {
                            CODE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '#include <iostream>\nint main(){std::cout<<"Hello World!";}'
                            }
                        }
                    },
                    {
                        opcode: "runCppInput",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "run C++ code [CODE] with input [INPUT]",
                        arguments: {
                            CODE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '#include <iostream>\nusing namespace std;\nint main(){string s;getline(cin,s);cout<<"You said: "<<s;}'
                            },
                            INPUT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "Hello World!"
                            }
                        }
                    }
                ]
            };
        }

        async runCpp(args) {
            try {
                let res = await fetch("https://skybuilder.synology.me/builder-extensions/cpp/", {
                    method: "POST",
                    body: new URLSearchParams({ code: args.CODE })
                });
                let data = await res.json();
                return data.output || data.error || "No output";
            } catch (e) {
                return "Error: " + e.message;
            }
        }

        async runCppInput(args) {
            try {
                let res = await fetch("https://skybuilder.synology.me/builder-extensions/cpp/", {
                    method: "POST",
                    body: new URLSearchParams({
                        code: args.CODE,
                        input: args.INPUT
                    })
                });
                let data = await res.json();
                return data.output || data.error || "No output";
            } catch (e) {
                return "Error: " + e.message;
            }
        }
    }

    Scratch.extensions.register(new Extension());
})(Scratch);
