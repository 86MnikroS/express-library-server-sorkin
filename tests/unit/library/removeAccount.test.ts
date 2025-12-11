import { ReaderModel } from "../../../src/databases/mongooseSchemas.js";
import { AccountServiceImplMongo } from "../../../src/service/AccountServiceImplMongo.js";

jest.mock("../../../src/databases/mongooseSchemas.js");

describe("AccountServiceImplMongo.removeAccount", () => {
    const service = new AccountServiceImplMongo();
    const mockId = 123;
    const mockReader = {
        _id: mockId,
        username: "user",
        email: "email@test.com",
        passHash: "hash",
        birthDate: new Date(),
        roles: []
    };

    test("Success: account removed", async () => {
        (ReaderModel.findByIdAndDelete as jest.Mock).mockResolvedValue(mockReader);

        const result = await service.removeAccount(mockId);

        expect(ReaderModel.findByIdAndDelete).toHaveBeenCalledWith(mockId);
        expect(result).toEqual(mockReader);
    });

    test("Failure: account not found", async () => {
        (ReaderModel.findByIdAndDelete as jest.Mock).mockResolvedValue(null);

        await expect(service.removeAccount(mockId)).rejects.toThrow("Account not found");
    });
});
