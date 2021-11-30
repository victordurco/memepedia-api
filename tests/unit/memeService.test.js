import Filter from "bad-words";

import * as memeService from "../../src/services/memeService.js";
import * as memeRepository from "../../src/repository/memeRepository.js";
import * as userRepository from "../../src/repository/userRepository.js";

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

        const result = await memeService.listMemes(5);
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

        const result = await memeService.listMemes(5);
        expect(result.message).toEqual("List all memes");
        expect(result.data.length).toBe(1);
    });
});
