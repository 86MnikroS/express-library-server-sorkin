import { ReaderModel } from "../../../src/databases/mongooseSchemas.js";
import { AccountServiceImplMongo } from "../../../src/service/AccountServiceImplMongo.js";
import { Roles } from "../../../src/utils/libTypes.js";

jest.mock("../../../src/databases/mongooseSchemas.js");

describe("AccountServiceImplMongo.addRole", () => {
    const service = new AccountServiceImplMongo();
    const mockId = 123;
    const newRole = Roles.ADMIN;
    const mockReader = {
        _id: mockId,
        roles: [],
        save: jest.fn().mockResolvedValue(undefined)
    };

    test("Success: role added", async () => {
        (ReaderModel.findById as jest.Mock).mockResolvedValue(mockReader);

        const result = await service.addRole(mockId, newRole);

        expect(ReaderModel.findById).toHaveBeenCalledWith(mockId);
        expect(mockReader.roles).toContain(newRole);
        expect(mockReader.save).toHaveBeenCalled();
        expect(result).toEqual(mockReader);
    });

    test("Failure: account not found", async () => {
        (ReaderModel.findById as jest.Mock).mockResolvedValue(null);

        await expect(service.addRole(mockId, newRole)).rejects.toThrow();
    });
});
