import { ReaderModel } from "../../../src/databases/mongooseSchemas.js";
import { AccountServiceImplMongo } from "../../../src/service/AccountServiceImplMongo.js";
import { UpdateReaderDto } from "../../../src/model/reader.js";

jest.mock("../../../src/databases/mongooseSchemas.js");

describe("AccountServiceImplMongo.editAccount", () => {
    const service = new AccountServiceImplMongo();
    const mockId = 123;
    const updateDto: UpdateReaderDto = {
        username: "newuser",
        email: "new@mail.com",
        birthDate: "2000-01-01"
    };
    const mockResult = {
        _id: mockId,
        username: "newuser",
        email: "new@mail.com",
        passHash: "hash",
        birthDate: new Date("2000-01-01"),
        roles: []
    };

    test("Success: account updated", async () => {
        (ReaderModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockResult);

        const result = await service.editAccount(mockId, updateDto);

        expect(ReaderModel.findByIdAndUpdate).toHaveBeenCalledWith(mockId, {
            username: updateDto.username,
            email: updateDto.email,
            birthdate: updateDto.birthDate
        }, { new: true });
        expect(result).toEqual(mockResult);
    });

    test("Failure: account not found", async () => {
        (ReaderModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

        await expect(service.editAccount(mockId, updateDto)).rejects.toThrow("Account not found");
    });
});
