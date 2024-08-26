document.addEventListener('DOMContentLoaded', function() {
    const labels = document.getElementsByClassName('main__label');
    const inputs = document.getElementsByClassName('main__input');

    const btnAdd = document.querySelector('.main__btn-add');
    const btnRemove = document.querySelector('.main__btn-remove');
    const btnUpdate = document.querySelector('.main__btn-update');
    const btnList = document.querySelector('.main__btn-list');
    const btnFind = document.querySelector('.main__btn-find');

    const elMovieList = document.querySelector('.main__list');

    let movieLibMap = new Map();

    function addToList(txt, flag=true){
        if(flag){elMovieList.innerHTML = ''}
        const listItem =  document.createElement('li')
        elMovieList.appendChild(listItem);
        const elP = document.createElement('p')
        listItem.appendChild(elP)

        const txtNode = document.createTextNode(txt)
        elP.appendChild(txtNode)
    }
    function makeDisplayNone(buttons, btn){
        buttons.forEach(function(button){
            button.style.display = 'none';
        })
        btn.style.gridColumn = '1/-1'
    }
    function makeDisplayBlock(buttons, btn){
        buttons.forEach(function(button){
            button.style.display = 'block';
        })
        btn.style.gridColumn = 'span 1'
    }
    btnAdd.addEventListener('click', function(e) {
        if(labels[1].style.display === 'none'){
            labels[1].style.display = 'block';
            labels[2].style.display = 'block';
            inputs[1].style.display = 'block';
            inputs[2].style.display = 'block';
            makeDisplayNone([btnRemove, btnUpdate, btnFind, btnList], btnAdd);
        }
        else{
            const movieName = inputs[0].value;
            const directorName = inputs[1].value;
            const releaseYear = Number(inputs[2].value);

            if(movieName && directorName && releaseYear){
                movieLibMap.set(movieName, {movieName: movieName, directorName: directorName, releaseYear: releaseYear});
                addToList(`'${movieName}' added to the list`);
            }else{
                addToList(`Make sure you fill in all fields!`);
            }
            labels[1].style.display = 'none';
            labels[2].style.display = 'none';
            inputs[1].style.display = 'none';
            inputs[2].style.display = 'none';
            makeDisplayBlock([btnRemove, btnUpdate, btnFind, btnList], btnAdd);
        }
    })

    btnRemove.addEventListener('click', function(e) {
        const movieName = inputs[0].value;
        if(movieName){
            if(movieLibMap.delete(movieName)){
                addToList(`'${movieName}' removed from the list`);
            }
            else addToList(`'${movieName}' does not exist`);
        }else {
            addToList(`Movie Name can not be empty`)
        }
    })
    btnList.addEventListener('click', function(e) {
        elMovieList.innerHTML = '';
        movieLibMap.forEach(function(value){
            const elListItem = document.createElement('li');
            elMovieList.appendChild(elListItem);

            const elMovieName = document.createElement('p');
            elListItem.appendChild(elMovieName);
            const elDirectorName = document.createElement('p');
            elListItem.appendChild(elDirectorName);
            const elReleaseYear = document.createElement('p');
            elListItem.appendChild(elReleaseYear);

            const textNodeMovieName = document.createTextNode(`Movie Name: ${value.movieName}`);
            const textNodeDirectorName =  document.createTextNode(`Director Name: ${value.directorName}`);
            const textNodeReleaseYear = document.createTextNode(`Release Year: ${value.releaseYear}`);

            elMovieName.appendChild(textNodeMovieName);
            elDirectorName.appendChild(textNodeDirectorName);
            elReleaseYear.appendChild(textNodeReleaseYear);
        })
    })

    btnUpdate.addEventListener('click', function(e) {

        if(labels[1].style.display === 'none'){
            const movieName = inputs[0].value;
            movieLibMap.delete(movieName);
            labels[1].style.display = 'block';
            labels[2].style.display = 'block';
            inputs[1].style.display = 'block';
            inputs[2].style.display = 'block';
            makeDisplayNone([btnAdd, btnRemove, btnFind, btnList], btnUpdate)
        }
        else{
            const movieName = inputs[0].value;
            const directorName = inputs[1].value;
            const releaseYear = Number(inputs[2].value);

            if(movieName && directorName && releaseYear){
                movieLibMap.set(movieName, {movieName: movieName, directorName: directorName, releaseYear: releaseYear});
                addToList(`Movie updated!`);
            }
            labels[1].style.display = 'none';
            labels[2].style.display = 'none';
            inputs[1].style.display = 'none';
            inputs[2].style.display = 'none';
            makeDisplayBlock([btnAdd, btnRemove, btnFind, btnList], btnUpdate)
        }
    })

    btnFind.addEventListener('click', function(e) {
        elMovieList.innerHTML = '';
        const movieName = inputs[0].value;
        if(movieName){
            const movieObject = movieLibMap.get(movieName);
            if(movieObject){
                const elListItem = document.createElement('li');
                elMovieList.appendChild(elListItem);

                const elMovieName = document.createElement('p');
                elListItem.appendChild(elMovieName);
                const elDirectorName = document.createElement('p');
                elListItem.appendChild(elDirectorName);
                const elReleaseYear = document.createElement('p');
                elListItem.appendChild(elReleaseYear);

                const textNodeMovieName = document.createTextNode(`Movie Name: ${movieObject.movieName}`);
                const textNodeDirectorName =  document.createTextNode(`Director Name: ${movieObject.directorName}`);
                const textNodeReleaseYear = document.createTextNode(`Release Year: ${movieObject.releaseYear}`);

                elMovieName.appendChild(textNodeMovieName);
                elDirectorName.appendChild(textNodeDirectorName);
                elReleaseYear.appendChild(textNodeReleaseYear);
            }else addToList(`Can not find '${movieName}'`);
        }
        else addToList(`Movie Name can not be empty!`)
    })
})