
window.addEventListener('DOMContentLoaded', () => {

  $('.closeButton')
    .on('click', () => {
      ipcRenderer.send('close-me')
    })
  $('.minimizeButton')
    .on('click', () => {
      ipcRenderer.send('minimize-me')
    })

  $('.progressBar').on('click', () => {
    refreshMasters()
  })

  $('body').on('click', '.addFav', function (e) {
    let addressIp = $(this).attr('data-addr')
    let serverName = $(this).attr('data-name')
    let objectNew = {"name": serverName, 'address': addressIp}
    
    let rawdata = fs.readFileSync( 'favourites.json' )
    let favList = JSON.parse(rawdata)
    favList.push(objectNew)
    let jsonToWrite = JSON.stringify( favList, null, 2)
    fs.writeFile("favourites.json", jsonToWrite, function(err) {
      if (err) {
        console.log(err)
      }
    })
  })

  $('body').on('click', '.appServerList li', function (e) {
    e.preventDefault()
    clearInterval(inRefresh)
    let svAdress = $(this).attr('href')
    checkServer(svAdress)
  })

})