import express from "express";
import morgan from "morgan";
import ordinals from "english-ordinals"


function Post(title, content) {
    this.id = 0;
    this.title = title;
    this.content = content;
}

function PostsDB() {
    this.all = [];
    this.add = function (post) {
        post.id = this.all.length + 1;
        this.all.push(post);
    },
    this.get = function (postId) {
        return this.all[postId - 1];
    },
    this.exists = function (postId) {
        return postId > 0 && postId <= this.all.length;
    }
}


function loadDb(db, amount) {
    let newPost;
    for (let i = 1; i <= amount; i++) {
        newPost = new Post(
            `${ordinals.getOrdinal(i)} rePoster post!`,
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget dapibus nisl, et ornare tortor. Quisque vitae ligula bibendum odio tincidunt convallis vitae quis lectus. Nullam vulputate et ipsum et dapibus. Aenean fringilla, dui sit amet iaculis elementum, arcu nisl sollicitudin lacus, non volutpat urna orci vitae nibh. Morbi sed pretium mi, eget vestibulum nulla. Nunc hendrerit erat gravida consequat ornare. Phasellus magna nisl, condimentum ut orci eu, commodo scelerisque purus. Praesent blandit et nulla vel laoreet. Donec tincidunt quam quis ornare viverra."
        );
        db.add(newPost);
    }
}

const app = express();
const port = 3000;
const urlEncoded = express.urlencoded({ extended: true });
const postsDb = new PostsDB();

app.use(express.static("public"));
app.use("/posts", express.static("public"));
app.use(morgan("dev"));

loadDb(postsDb, 10);


app.get("/", (req, res) => {
    res.render("index.ejs", {
        action: "Stories",
        targetContent: "landing",
        callToWritting: true,
        posts: postsDb.all
    });
});


app.get("/posts/new", (req, res) => {
    res.render("index.ejs", { 
        action: "New Post",
        callToWritting: false,
        targetContent: "new-post"
    });
});


app.post("/posts/new", urlEncoded, (req, res) => {
    if (!req.body || !req.body.title || !req.body.content) {
        res.sendStatus(400);
        return;
    }
    const newPost = new Post(req.body.title, req.body.content);
    postsDb.add(newPost);
    res.redirect(`/posts/${newPost.id}`);
});


app.get("/posts/:id", (req, res) => {
    const id = req.params.id;
    if (!postsDb.exists(id)) {
        res.sendStatus(404);
        return;
    }
    res.render("index.ejs", { 
        action: "Story Time!",
        targetContent: "view-post",
        callToWritting: true,
        post: postsDb.get(id)
    });
});



app.listen(port, () => console.log(`Server listing on port ${port}`));