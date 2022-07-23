const posts = [
    { title: 'Post One', body: 'This is post one',  lastactivitytime: new Date().getTime()},
    { title: 'Post Two', body: 'This is post two', lastactivitytime: new Date().getTime() }
];

let intervalId = 0;
function getPosts() {
    clearInterval(intervalId);
    intervalId =   setInterval(() => {
        let output = '';
        
        for(let i=0; i<posts.length; i++) {
            output += `<li>${posts[i].title} </li>`;        
            document.body.innerHTML = output;
        }

    }, 1000);      
        
    }


function createPost(post) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.push(post);

            const error = false;
            if(!error) {
                resolve();

            }
            else{
                reject('Error: Something went wrong');
            }
            
        }, 3000);
    })
    
}

function deletePost() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(posts.values !== 0){
                resolve(posts.pop());
            }

            else{
                reject('Array is empty now');
            }
        }, 1000);
    });
}

createPost({title: 'Post Three', body: 'This is post three'})
    .then(() => {
        getPosts()
        deletePost().then(() => {
            getPosts()
        })
    })
    .catch(err => console.log(err))
    .then(deletePost)
    .catch(err => console.log(err))
    .then(deletePost)
    .catch(err => console.log(err))
    .then(deletePost)
    .catch(err => console.log(err));

const promise1 = Promise.resolve('Hello World');
const promise2 = 10;
const promise3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, "Goodbye")
});

Promise.all([promise1, promise2, promise3]).then((
    (values) => console.log(values)
));

const updateLastUserActivityTime = new Promise((resolve, reject) => {
        setTimeout(() => {
            posts.lastactivitytime = new Date().getTime();
            resolve(posts.lastactivitytime)
        }, 1000)
    })    


    Promise.all([createPost, updateLastUserActivityTime]).then((
        (values) => console.log(values)
    )).catch(err => console.log(err))

    





    
    
    


// function create4thPost(post, callback){
//     setTimeout(() => {
//         posts.push({ ...post, createdAt: new Date().getTime() });
//         callback();
//     }, 6000);
// }



// createPost({title: 'Post Three', body: 'This is post three'}, getPosts);
// create4thPost({title: 'Post Four', body: 'This is post four'}, getPosts);

// var timer;
// var count = 0;
// function lastEditedInSecondsAgo() {
//     count = 0;
//     clearInterval(timer)
//     timer = setInterval(() => {
//         count++;
//         console.log(count);
//     }, 6000);
// }

// lastEditedInSecondsAgo();