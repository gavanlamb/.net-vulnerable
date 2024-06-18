describe("listComments", () => {
    beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
    });

    it("should retrieve comments successfully", async () => {
        const debugMock = jest.fn();
        jest.doMock("@actions/core", () => ({debug: debugMock}));

        const comments = [
            {
                id: 1,
                body: "Test comment"
            }
        ];
        const clientMock = {
            rest: {
                issues: {
                    listComments: jest.fn().mockResolvedValue({status: 200, data: comments})
                },
            },
        };
        const createOctokitClientMock = jest.fn().mockResolvedValue(clientMock);
        jest.doMock("../../src/clients/octokit", () => ({ createOctokitClient: createOctokitClientMock }));

        const owner = "owner";
        const repo = "repo";
        const issueNumber = 1;

        const {listComments} = await import("../../src/clients/githubIssueCommentClient");
        const result = await listComments(owner, repo, issueNumber);

        expect(debugMock).toHaveBeenCalledWith(`Going to call the rest endpoint to delete an issue comment with the following details:\n\towner: ${owner}\n\trepo: ${repo}\n\tissueNumber: ${issueNumber}`);
        expect(clientMock.rest.issues.listComments).toHaveBeenCalledWith({
            owner,
            repo,
            issue_number: issueNumber,
        });
        expect(debugMock).toHaveBeenCalledWith("Called the rest endpoint to fetch comments");
        expect(debugMock).toHaveBeenCalledWith("Comments retrieved successfully.");
        expect(result).toEqual(comments);
    });

    it("should throw an error if the request fails", async () => {
        const debugMock = jest.fn();
        jest.doMock("@actions/core", () => ({debug: debugMock}));

        const clientMock = {
            rest: {
                issues: {
                    listComments: jest.fn().mockResolvedValue({status: 404}),
                },
            },
        };
        const createOctokitClientMock = jest.fn().mockResolvedValue(clientMock);
        jest.doMock("../../src/clients/octokit", () => ({ createOctokitClient: createOctokitClientMock }));

        const owner = "owner";
        const repo = "repo";
        const issueNumber = 1;

        const {listComments} = await import("../../src/clients/githubIssueCommentClient");
        const listCommentsPromise = listComments(owner, repo, issueNumber);

        await expect(listCommentsPromise).rejects.toThrow(`Request to retrieve comments failed for:\n\towner: ${owner}\n\trepo: ${repo}\n\tissueNumber: ${issueNumber}`);
        expect(debugMock).toHaveBeenCalledWith(`Going to call the rest endpoint to delete an issue comment with the following details:\n\towner: ${owner}\n\trepo: ${repo}\n\tissueNumber: ${issueNumber}`);
        expect(clientMock.rest.issues.listComments).toHaveBeenCalledWith({
            owner,
            repo,
            issue_number: issueNumber,
        });
        expect(debugMock).toHaveBeenCalledWith("Called the rest endpoint to fetch comments");
    });
});

describe("createComment", () => {
    beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
    });

    it("should create a comment successfully", async () => {
        const debugMock = jest.fn();
        jest.doMock("@actions/core", () => ({debug: debugMock}));

        const clientMock = {
            rest: {
                issues: {
                    createComment: jest.fn().mockResolvedValue({status: 201})
                },
            },
        };
        const createOctokitClientMock = jest.fn().mockResolvedValue(clientMock);
        jest.doMock("../../src/clients/octokit", () => ({ createOctokitClient: createOctokitClientMock }));

        const owner = "owner";
        const repo = "repo";
        const issueNumber = 1;
        const comment = "Test comment";

        const {createComment} = await import("../../src/clients/githubIssueCommentClient");
        await createComment(owner, repo, issueNumber, comment);

        expect(debugMock).toHaveBeenCalledWith(`Going to call the rest endpoint to delete an issue comment with the following details:\n\towner: ${owner}\n\trepo: ${repo}\n\tissueNumber: ${issueNumber}\n\tbody: ${comment}`);
        expect(clientMock.rest.issues.createComment).toHaveBeenCalledWith({
            owner,
            repo,
            issue_number: issueNumber,
            body: comment,
        });
        expect(debugMock).toHaveBeenCalledWith("Called the rest endpoint to create an issue comment");
        expect(debugMock).toHaveBeenCalledWith("Comment created successfully.");
    });

    it("should throw an error if the request fails", async () => {
        const debugMock = jest.fn();
        jest.doMock("@actions/core", () => ({debug: debugMock}));

        const clientMock = {
            rest: {
                issues: {
                    createComment: jest.fn().mockResolvedValue({status: 400}),
                },
            },
        };
        const createOctokitClientMock = jest.fn().mockResolvedValue(clientMock);
        jest.doMock("../../src/clients/octokit", () => ({ createOctokitClient: createOctokitClientMock }));

        const owner = "owner";
        const repo = "repo";
        const issueNumber = 1;
        const comment = "Test comment";

        const {createComment} = await import("../../src/clients/githubIssueCommentClient");
        const createCommentPromise = createComment(owner, repo, issueNumber, comment);

        await expect(createCommentPromise).rejects.toThrow(`Request to create comment failed for:\n\towner: ${owner}\n\trepo: ${repo}\n\tissueNumber: ${issueNumber}`);
        expect(debugMock).toHaveBeenCalledWith(`Going to call the rest endpoint to delete an issue comment with the following details:\n\towner: ${owner}\n\trepo: ${repo}\n\tissueNumber: ${issueNumber}\n\tbody: ${comment}`);
        expect(clientMock.rest.issues.createComment).toHaveBeenCalledWith({
            owner,
            repo,
            issue_number: issueNumber,
            body: comment,
        });
        expect(debugMock).toHaveBeenCalledWith("Called the rest endpoint to create an issue comment");
    });
});

describe("deleteComment", () => {
    beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
    });

    it("should delete a comment successfully", async () => {
        const debugMock = jest.fn();
        jest.doMock("@actions/core", () => ({debug: debugMock}));

        const clientMock = {
            rest: {
                issues: {
                    deleteComment: jest.fn().mockResolvedValue({status: 204}),
                },
            },
        };
        const createOctokitClientMock = jest.fn().mockResolvedValue(clientMock);
        jest.doMock("../../src/clients/octokit", () => ({ createOctokitClient: createOctokitClientMock }));

        const owner = "owner";
        const repo = "repo";
        const commentId = 1;

        const {deleteComment} = await import("../../src/clients/githubIssueCommentClient");
        await deleteComment(owner, repo, commentId);

        expect(debugMock).toHaveBeenCalledWith(`Going to call the rest endpoint to delete an issue comment with the following details:\n\towner: ${owner}\n\trepo: ${repo}\n\tcommentId: ${commentId}`);
        expect(clientMock.rest.issues.deleteComment).toHaveBeenCalledWith({
            owner,
            repo,
            comment_id: commentId,
        });
        expect(debugMock).toHaveBeenCalledWith("Called the rest endpoint to delete an issue comment");
        expect(debugMock).toHaveBeenCalledWith("Comment deleted successfully.");
    });

    it("should throw an error if the request fails", async () => {
        const debugMock = jest.fn();
        jest.doMock("@actions/core", () => ({debug: debugMock}));

        const clientMock = {
            rest: {
                issues: {
                    deleteComment: jest.fn().mockResolvedValue({status: 400}),
                },
            },
        };
        const createOctokitClientMock = jest.fn().mockResolvedValue(clientMock);
        jest.doMock("../../src/clients/octokit", () => ({ createOctokitClient: createOctokitClientMock }));

        const owner = "owner";
        const repo = "repo";
        const commentId = 1;

        const {deleteComment} = await import("../../src/clients/githubIssueCommentClient");
        const deleteCommentPromise = deleteComment(owner, repo, commentId);

        await expect(deleteCommentPromise).rejects.toThrow(`Request to delete comment failed for:\n\towner: ${owner}\n\trepo: ${repo}\n\tcommentId: ${commentId}`);
        expect(debugMock).toHaveBeenCalledWith(`Going to call the rest endpoint to delete an issue comment with the following details:\n\towner: ${owner}\n\trepo: ${repo}\n\tcommentId: ${commentId}`);
        expect(clientMock.rest.issues.deleteComment).toHaveBeenCalledWith({
            owner,
            repo,
            comment_id: commentId,
        });
        expect(debugMock).toHaveBeenCalledWith("Called the rest endpoint to delete an issue comment");
    });
});

describe("updateComment", () => {
    beforeEach(() => {
        jest.resetModules();
        jest.clearAllMocks();
    });

    it("should update a comment successfully", async () => {
        const debugMock = jest.fn();
        jest.doMock("@actions/core", () => ({debug: debugMock}));

        const clientMock = {
            rest: {
                issues: {
                    updateComment: jest.fn().mockResolvedValue({status: 200}),
                },
            },
        };
        const createOctokitClientMock = jest.fn().mockResolvedValue(clientMock);
        jest.doMock("../../src/clients/octokit", () => ({ createOctokitClient: createOctokitClientMock }));

        const owner = "owner";
        const repo = "repo";
        const commentId = 1;
        const comment = "Updated comment";

        const {updateComment} = await import("../../src/clients/githubIssueCommentClient");
        await updateComment(owner, repo, commentId, comment);

        expect(debugMock).toHaveBeenCalledWith(`Going to call the rest endpoint to update an issue comment with the following details:\n\towner: ${owner}\n\trepo: ${repo}\n\tcommentId: ${commentId}\n\tbody: ${comment}`);
        expect(clientMock.rest.issues.updateComment).toHaveBeenCalledWith({
            owner,
            repo,
            comment_id: commentId,
            body: comment,
        });
        expect(debugMock).toHaveBeenCalledWith("Called the rest endpoint to update an issue comment");
        expect(debugMock).toHaveBeenCalledWith("Comment updated successfully");
    });

    it("should throw an error if the request fails", async () => {
        const debugMock = jest.fn();
        jest.doMock("@actions/core", () => ({debug: debugMock}));

        const clientMock = {
            rest: {
                issues: {
                    updateComment: jest.fn().mockResolvedValue({status: 400}),
                },
            },
        };
        const createOctokitClientMock = jest.fn().mockResolvedValue(clientMock);
        jest.doMock("../../src/clients/octokit", () => ({ createOctokitClient: createOctokitClientMock }));

        const owner = "owner";
        const repo = "repo";
        const commentId = 1;
        const comment = "Updated comment";

        const {updateComment} = await import("../../src/clients/githubIssueCommentClient");
        const updateCommentPromise = updateComment(owner, repo, commentId, comment);

        await expect(updateCommentPromise).rejects.toThrow(`Request to update comment failed for:\n\towner: ${owner}\n\trepo: ${repo}\n\tcommentId: ${commentId}`);
        expect(debugMock).toHaveBeenCalledWith(`Going to call the rest endpoint to update an issue comment with the following details:\n\towner: ${owner}\n\trepo: ${repo}\n\tcommentId: ${commentId}\n\tbody: ${comment}`);
        expect(clientMock.rest.issues.updateComment).toHaveBeenCalledWith({
            owner: "owner",
            repo: "repo",
            comment_id: 1,
            body: "Updated comment",
        });
        expect(debugMock).toHaveBeenCalledWith("Called the rest endpoint to update an issue comment");
    });
});
