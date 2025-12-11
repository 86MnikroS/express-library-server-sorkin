import { ReaderModel } from "../../../src/databases/mongooseSchemas.js";
import { AccountServiceImplMongo } from "../../../src/service/AccountServiceImplMongo.js";
import bcrypt from "bcryptjs";

jest.mock("../../../src/databases/mongooseSchemas.js");
jest.mock("bcryptjs");

describe("AccountServiceImplMongo.checkPassword", () => {
    const service = new AccountServiceImplMongo();
    const mockId = 123;
    const mockPass = "password";
    const mockReader = {
        _id: mockId,
        username: "user",
        email: "test@mail.com",
        birthDate: new Date(),
        passHash: "hash",
        roles: []
    };

    test("Success: password matches", async () => {
        (ReaderModel.findById as jest.Mock).mockReturnValue({
            lean: jest.fn().mockReturnValue({
                exec: jest.fn().mockResolvedValue(mockReader)
            })
        });
        (bcrypt.compareSync as jest.Mock).mockReturnValue(true);

        const result = await service.checkPassword(mockId, mockPass);

        expect(result).toEqual(mockReader);
    });

    test("Failure: wrong credentials", async () => {
        (ReaderModel.findById as jest.Mock).mockReturnValue({
            lean: jest.fn().mockReturnValue({
                exec: jest.fn().mockResolvedValue(mockReader)
            })
        });
        (bcrypt.compareSync as jest.Mock).mockReturnValue(false);

        await expect(service.checkPassword(mockId, mockPass)).rejects.toThrow("Wrong credentials");
    });
});
