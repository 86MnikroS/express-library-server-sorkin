import { ReaderModel } from "../../../src/databases/mongooseSchemas.js";
import { AccountServiceImplMongo } from "../../../src/service/AccountServiceImplMongo.js";
import bcrypt from "bcryptjs";

jest.mock("../../../src/databases/mongooseSchemas.js");
jest.mock("bcryptjs");

describe("AccountServiceImplMongo.changePassword", () => {
    const service = new AccountServiceImplMongo();
    const mockId = 123;
    const newPass = "newPass";
    const mockReader = {
        _id: mockId,
        passHash: "oldHash",
        save: jest.fn().mockResolvedValue(undefined)
    };

    test("Success: password changed", async () => {
        (ReaderModel.findById as jest.Mock).mockResolvedValue(mockReader);
        (bcrypt.hashSync as jest.Mock).mockReturnValue("newHash");

        await service.changePassword(mockId, newPass);

        expect(ReaderModel.findById).toHaveBeenCalledWith(mockId);
        expect(bcrypt.hashSync).toHaveBeenCalledWith(newPass, 10);
        expect(mockReader.passHash).toBe("newHash");
        expect(mockReader.save).toHaveBeenCalled();
    });

    test("Failure: account not found", async () => {
        (ReaderModel.findById as jest.Mock).mockResolvedValue(null);

        await expect(service.changePassword(mockId, newPass)).rejects.toThrow("Account not found");
    });
});
