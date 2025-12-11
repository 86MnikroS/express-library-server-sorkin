import { ReaderModel } from "../../../src/databases/mongooseSchemas.js";
import { AccountServiceImplMongo } from "../../../src/service/AccountServiceImplMongo.js";

jest.mock("../../../src/databases/mongooseSchemas.js");

describe("AccountServiceImplMongo.getAccount", () => {
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

    test("Success: account found", async () => {
        (ReaderModel.findById as jest.Mock).mockReturnValue({
            lean: jest.fn().mockReturnValue({
                exec: jest.fn().mockResolvedValue(mockReader)
            })
        });

        const result = await service.getAccount(mockId);

        expect(ReaderModel.findById).toHaveBeenCalledWith(mockId);
        expect(result).toEqual(mockReader);
    });

    test("Failure: account not found", async () => {
        (ReaderModel.findById as jest.Mock).mockReturnValue({
            lean: jest.fn().mockReturnValue({
                exec: jest.fn().mockResolvedValue(null)
            })
        });

        await expect(service.getAccount(mockId)).rejects.toThrow("Account not found");
    });
});
