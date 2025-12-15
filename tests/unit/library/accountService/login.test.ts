import { AccountServiceImplMongo } from "../../../../src/service/AccountServiceImplMongo.js";
import { getJWT } from "../../../../src/utils/tools.js";

jest.mock("../../../../src/utils/tools.js");

describe("AccountServiceImplMongo.login", () => {
    const service = new AccountServiceImplMongo();
    const mockId = 123;
    const mockPass = "password";
    const mockReader = {
        _id: mockId,
        roles: []
    };
    const mockToken = "token";

    test("Success: returns token", async () => {
        jest.spyOn(service, 'checkPassword').mockResolvedValue(mockReader as any);
        (getJWT as jest.Mock).mockReturnValue(mockToken);

        const result = await service.login(mockId, mockPass);

        expect(service.checkPassword).toHaveBeenCalledWith(mockId, mockPass);
        expect(getJWT).toHaveBeenCalledWith(mockId, mockReader.roles);
        expect(result).toBe(mockToken);
    });

    test("Failure: checkPassword fails", async () => {
        jest.spyOn(service, 'checkPassword').mockRejectedValue(new Error("Wrong credentials"));

        await expect(service.login(mockId, mockPass)).rejects.toThrow("Wrong credentials");
    });
});
