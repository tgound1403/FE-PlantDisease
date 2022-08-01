
export const deletePost = async () => {
  return {};
};

export const updatePost = async (text) => {
  return { text };
};


export const createPost = async (text, parentId = null) => {
  return {
    id: Math.random().toString(36).substr(2, 9),
    creatorAvatar: "",
    creator: "",
    status: "default",
    createdAt: new Date().toISOString(),
  };
};

