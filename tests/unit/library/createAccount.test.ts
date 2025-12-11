import {ReaderModel} from "../../../src/databases/mongooseSchemas.js";
import {AccountServiceImplMongo} from "../../../src/service/AccountServiceImplMongo.js";
import {Reader} from "../../../src/model/reader.js";
jest.mock("../../../src/databases/mongooseSchemas.js");

describe("AccountServiceImplMongo.createAccount", () => {
    const service = new AccountServiceImplMongo();
    const mockReader = {
        _id:123
    }
    test("Failed test: reader already exists", () => {
        (ReaderModel.findById as jest.Mock).mockResolvedValue(mockReader);
        expect(service.createAccount(mockReader as Reader)).rejects.toThrow("Reader already exists")
        expect(ReaderModel.findById).toHaveBeenCalledWith(mockReader._id);
    })
    test("Passed test", () => {
        (ReaderModel.findById as jest.Mock).mockResolvedValue(null);
        (ReaderModel as unknown as jest.Mock).mockImplementation(() => ({
            save: jest.fn().mockResolvedValue(undefined)
        }))
        expect(service.createAccount(mockReader as Reader)).resolves.toBeUndefined()
        expect(ReaderModel.findById).toHaveBeenCalledWith(mockReader._id);
    })
})