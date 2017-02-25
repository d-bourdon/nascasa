/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   main.js                                            :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: dbourdon <dbourdon@student.42.fr>          +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2017/02/25 18:42:28 by dbourdon          #+#    #+#             */
/*   Updated: 2017/02/25 18:53:58 by dbourdon         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

const { app, BrowserWindow } = require('electron');
const start = require('./index');

app.on('ready', () => {
  let main = null
  let loading = new BrowserWindow({ width: 476, height: 270, center: true, show: false, frame: false})

  loading.once('show', () => {
    main = new BrowserWindow({show: false})
    start.event.on('ready', () => {
      console.log('main loaded')
      main.show()
      loading.hide()
      loading.close()
    })
    // long loading html
    main.loadURL('file://'+ __dirname +'/public/index.html')
  })
  loading.loadURL('file://'+ __dirname +'/public/load.png')
  loading.webContents.on('did-finish-load', function() {
     loading.show();
 });
  start.start();
})