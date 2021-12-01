import * as memeService from "../../src/services/memeService.js";
import * as memeRepository from "../../src/repository/memeRepository.js";
import * as userRepository from "../../src/repository/userRepository.js";

jest.mock("bad-words");

describe("listMemes tests", () => {
    it("Should return No memes today! when limit = 0", async () => {
        const result = await memeService.listMemes(0);
        console.log(result);
        expect(result.message).toEqual("No memes today!");
        expect(result.data.length).toBe(0);
    });

    it("Should return No memes today! when memes is empty", async () => {
        jest.spyOn(memeRepository, "listMemes").mockImplementationOnce(() => {
            return [];
        });

        const result = await memeService.listMemes(1);
        expect(result.message).toEqual("No memes today!");
        expect(result.data.length).toBe(0);
    });

    it("Should return List all memes when limit > 0 and memes isn't empty", async () => {
        jest.spyOn(memeRepository, "listMemes").mockImplementationOnce(() => {
            return [
                {
                    url: "https://memegenerator.net/img/instances/62899729.jpg",
                    text: "awesome meme",
                    published_by: 1,
                },
            ];
        });

        const result = await memeService.listMemes(1);
        expect(result.message).toEqual("List all memes");
        expect(result.data.length).toBe(1);
    });

    it("Should return List all memes when limit = undefined and memes isn't empty", async () => {
        jest.spyOn(memeRepository, "listMemes").mockImplementationOnce(() => {
            return [
                {
                    url: "https://memegenerator.net/img/instances/62899729.jpg",
                    text: "awesome meme",
                    published_by: 1,
                },
            ];
        });

        const result = await memeService.listMemes(undefined);
        expect(result.message).toEqual("List all memes");
        expect(result.data.length).toBe(1);
    });
});

describe("Insert meme tests", () => {
    it("Should return No user! when token is invalid", async () => {
        jest.spyOn(
            userRepository,
            "findUserByTokenSession"
        ).mockImplementationOnce(() => {
            return [];
        });

        const result = await memeService.insertMeme(
            "invalidToken",
            "https://memegenerator.net/img/instances/62899729.jpg",
            "awesome meme"
        );
        expect(result.message).toEqual("No user!");
        expect(result.data.length).toBe(0);
    });

    it("Should return inserted meme by user", async () => {
        jest.spyOn(
            userRepository,
            "findUserByTokenSession"
        ).mockImplementationOnce(() => {
            return [{ id: 1 }];
        });

        jest.spyOn(memeRepository, "insertMeme").mockImplementationOnce(() => {
            return [
                {
                    url: "https://memegenerator.net/img/instances/62899729.jpg",
                    text: "awesome meme",
                    published_by: 1,
                },
            ];
        });

        const result = await memeService.insertMeme(
            "validToken",
            "https://memegenerator.net/img/instances/62899729.jpg",
            "its a new meme"
        );
        expect(result.data.length).toBe(1);
    });
});
