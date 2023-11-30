const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const blogDataFile = "blogs.json";

// Function to read blog data from JSON file
function readBlogData() {
  try {
    const data = fs.readFileSync(blogDataFile, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Function to write blog data to JSON file
function writeBlogData(blogs) {
  const data = JSON.stringify(blogs, null, 2);
  fs.writeFileSync(blogDataFile, data);
}

// get
exports.find = (req, res) => {
  const blogs = readBlogData();
  
  res.json(blogs);
};

// post
exports.create = (req, res) => {
  const blogs = readBlogData();
  const newBlog = req.body;
  console.log(newBlog);

  newBlog.id = uuidv4();
  blogs.push(newBlog);
  writeBlogData(blogs);

  res
    .status(201)
    .json({ message: "Blog created successfully", id: newBlog.id, data: newBlog });
};
