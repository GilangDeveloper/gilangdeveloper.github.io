try {
    //-- tag html control
    item_fc = document.querySelector('[data-widget=treeview]');
    item_msg = document.querySelector('#notify');
    if (isDocs == undefined) {
        tag_pengunjung = document.querySelector('span#pengunjung_length');
        tag_cpu = document.querySelector('span#cpu_usage');
        tag_clock = document.querySelector('span#clock');
        tag_battery_status = document.querySelector('small#battery_status');
        tag_battery_level = document.querySelector('span#battery_level');
        tag_netinfo = document.querySelector('#informationnet');
        iklan
        iklanPending = true;
        function iklan() {
            if (iklanPending) {
                iklanPending = false;
                fetch('/iklan/gilangdev').then(resp => resp.json()).then(resp => {
                    document.querySelector('#iklan_body').innerHTML = `<a target="_blank" style="color: white;" href="https://m.youtube.com/watch?v=${RegExp("/vi/(.*?)/").exec(resp.thumbnail)[1]}"><img alt="Subscribe Fikri Am" style="width: 950px" src="${resp.thumbnail}">
					<br>
					${resp.title}<br>
					<small>${resp.published}</small>
					</a>`; iklanPending = true;
                    // console.log(resp)
                });
            }
        }
        repeatiklan = setInterval(() => {
            iklan();
        }, 5000);
        iklan();
        // popup request menu
        function requestmenu() {
            var Toast = Swal.mixin({
                showClass: {
                    popup: 'animate__bounceInRight'
                },
                hideClass: {
                    popup: 'animate__bounceOutRight'
                },
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3500,
                timerProgressBar: true
            })
            let tks = "",
                region = navigator.language.toLowerCase(),
                date = new Date();
            try {
                region = region.split("-")[0].toLowerCase();
            } catch (e) { }
            if (/id|indonesia/.test(region) && date.getMonth() == 10 && date.getDate() == 10) {
                tks = `<p style="color: red;background: rgba(128,128,128,0.3);">selamat ha<span style="color: white;">ri pahlawan</span></p><div style="border:1px solid black;background:red;display:block;color:red;">.</div><div style="border:1px solid black;border-top:none;background:white;display:block;color:white;">.</div>`;
            } else if (/id|indonesia/.test(region) && date.getMonth() == 10 && date.getDate() == 12) {
                tks = `<p style="color: black;">selamat hari ayah nasional</p>`;
            } else if (/id|indonesia/.test(region) && date.getMonth() == 8 && date.getDate() == 17) {
                tks = tks = `<p style="color: red;background: rgba(128,128,128,0.3);">Selamat hari kem<span style="color: white;">erdekaan Indonesia</span></p><div style="border:1px solid black;background:red;display:block;color:red;">.</div><div style="border:1px solid black;border-top:none;background:white;display:block;color:white;">.</div>`;
            } else {
                tks = `<p style="color: gray;">Welcome to gilang api's</p>`;
            }

            Toast.fire({
                icon: 'info',
                title: tks
            });
        }
    }
    //-- Auto autocapitalize
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
    }

    //-- menu documentation
    for (var e of item_list) {
        coder = `<li class="nav-item">
		<a href="#" class="nav-link">
		<i class="${e.icon.trim()} nav-icon"></i>
		<p>
		${capitalizeFirstLetter(e.name.trim())}
		<i class="right fas fa-angle-left"></i>
		${e.event ? `<span class="right badge badge-danger">${e.event.trim()}</span>` : ``}
		</p>
		</a>
		<ul class="nav nav-treeview">
		%item$
		</ul>
		</li>
		`;
        item_coder = "";
        for (var ee of e.item) {
            item_coder += `<li class="nav-item">
			<a href="${ee.url.trim()}" ${ee.error ? 'disabled="disabled"' : ""} target="_blank" class="nav-link">
			<!--<i class="far fa-circle nav-icon"></i>-->
			<p>
			- ${capitalizeFirstLetter(ee.name.trim())}
			${ee.event ? `<span class="right badge badge-danger">${ee.event.trim()}</span>` : ``}
			${ee.error ? `<span class="right badge badge-danger">ERROR</span>` : ``}
			</p>
			</a>
			</li>`;
        }

        item_fc.innerHTML += coder.replace('%item$', item_coder);
    }

    if (isDocs == undefined) {
        //-- Browser information
        information = document.querySelector('#information');
        repeatinfo = setInterval(function () {
            information.innerHTML = `<b>Browser CodeName:</b> ${navigator.appCodeName}<br><b>Browser Name:</b> ${navigator.appName}<br><b>Cookies Enabled:</b> ${navigator.cookieEnabled}<br><b>Browser Online:</b> ${navigator.onLine}<br><b>Platform:</b> ${navigator.platform} <br>
			<b>User-Agent:</b> ${navigator.userAgent} <br><b>Time: </b> ${new Date()}`;
        }, 10);

        //-- CPU Usage detection
        let rss_size = "0B";
        fetch("https://hadi-api.herokuapp.com/system/about?rss=" + encodeURIComponent(rss_size)).then(res => res.text()).then(res => {
            rss_size = res;
            tag_cpu.innerHTML = `${res}<small>/ 500MB</small>`;
        });
        setInterval(function () {
            fetch("https://hadi-api.herokuapp.com/system/about?rss=" + encodeURIComponent(rss_size)).then(res => res.text()).then(res => {
                if (res.trim()) {
                    rss_size = res;
                    tag_cpu.innerHTML = `${res}<small>/ 500MB</small>`;
                } else { }
            });
        }, 2000);

        //-- pengunjung visitor length
        if (localStorage.getItem('Pengunjung')) {
            setInterval(function () {
                fetch("https://api.countapi.xyz/get/mysite.com").then(res => res.json()).then(res => {
                    tag_pengunjung.innerHTML = res.value + " <small>perangkat</small>";
                });
            }, 2500);
        } else {
            fetch("https://api.countapi.xyz/hit/mysite.com").then(res => res.json()).then(res => {
                localStorage.setItem('Pengunjung', 'true');
                tag_pengunjung.innerHTML = res.value + " <small>perangkat</small>";
            });
        }
    }
    //-- time set live
    function time(time) {
        time2 = new Date().getTime();
        msec = time2 - Number(time);
        detik = msec / 1000;
        menit = detik / 60;
        jam = menit / 60;
        hari = jam / 24;
        minggu = hari / 7;
        jam_str = Number(String(jam).split('.')[0]);
        menit_str = Number(String(menit).split('.')[0]);
        detik_str = Number(String(detik).split('.')[0]);
        hari_str = Number(String(hari).split('.')[0]);
        minggu_str = Number(String(minggu).split('.')[0]);

        if (minggu_str > 0 && minggu_str < 7) {
            return `<small>${minggu_str} weeks ago</small>`;
        } else if (minggu > 52.1428571 && minggu_str > 7) {
            return `<small>a few years ago</small>`;
        } else if (detik < 60 && detik_str > 0) {
            return `<small>${detik_str} sec ago</small>`;
        } else if (menit < 60 && menit_str > 0) {
            return `<small>${menit_str} mins ago</small>`;
        } else if (jam < 24 && jam_str > 0) {
            return `<small>${jam_str} hours ago</small>`;
        } else if (hari < 7 && hari_str > 0) {
            return `<small>${hari_str} days ago</small>`;
        } else {
            return `<small>${hari_str} days ago</small>`;
        }
    }
    msg = `<span class="dropdown-item dropdown-header">$jumlah Notifications</span><!--$item--><div class="dropdown-divider"></div>
	<a href="#" class="dropdown-item dropdown-footer">See All Notifications</a>`;
    msg_ = ``;

    for (var e = 0; e < message_list.length; e++) {
        msg_ += `<div class="dropdown-divider"></div>
		<a href="#" class="dropdown-item">
		<i class="${message_list[e].icon.trim()} mr-2"></i> ${message_list[e].title.length > 17 ? `<small>${message_list[e].title.trim()}</small>` : `${message_list[e].title.trim()}`}
		<span class="float-right text-muted text-sm" id="time" time="${message_list[e].timing.trim()}"></span>
		</a>`;
    }
    msg = msg.replace('<!--$item-->', msg_);
    msg = msg.replace('$jumlah', message_list.length);

    item_msg.innerHTML = msg;

    document.querySelector('span#notify_length').innerHTML = message_list.length;
    timingset = document.querySelectorAll('span#time');
    timingeval = `setInterval(function() {`;

    for (var e = 0; e < timingset.length; e++) {
        timingeval += `timingset[${e}].innerHTML = time(timingset[${e}].getAttribute('time'));`;
    }
    timingeval += `},10);`;

    eval(timingeval);
    if (isDocs == undefined) {
        //-- clock
        function duo(s) {
            return s < 10 ? "0" + s : s;
        }
        function oud(s) {
            return s < 10 ? s + "0" : s;
        }

        setInterval(function () {

            jam = duo(new Date().getHours());
            menit = duo(new Date().getMinutes());
            detik = duo(new Date().getSeconds());

            if (jam >= 19) {
                clock_string = 'malam';
            } else if (jam >= 18) {
                clock_string = 'petang';
            } else if (jam >= 15) {
                clock_string = 'Sore';
            } else if (jam >= 10) {
                clock_string = 'Siang';
            } else if (jam >= 5) {
                clock_string = 'Pagi';
            } else if (jam >= 3) {
                clock_string = 'subuh';
            } else if (jam >= 0) {
                clock_string = 'dini hari';
            } else {
                clock_string = 'hai bang';
            }

            tag_clock.innerHTML = `${jam}:${menit}:${detik} <small>${clock_string}</small>`;
        },
            10);

        //-- Battery
        setInterval(function () {
            navigator.getBattery().then(battery => {
                battery_level = String(battery.level).split('.')[1];
                tag_battery_level.innerHTML = `${(battery_level.length <= 1) ? oud(Number(battery_level)) : battery_level}% <small>${battery.charging ? 'charging' : 'discharging'}</small>`;
            });
        },
            10);

        //-- network information
        let region = navigator.language;
        let isVPN = false;
        function net() {
            fetch('https://hadi-api.herokuapp.com/api/ip').then(res => res.json()).then(res => {
                res = res.result;
                if (!region.includes(res.countryCode)) isVPN = true;
                tag_netinfo.innerHTML = `<b>IP: </b>${res.ip}<br><b>ISP: </b>${res.isp}<br><b>CITY: </b>${res.city}<br><b>DISTRICT: </b>${res.district}<br><b>TIMEZONE: </b>${res.timezone}<br><b>COUNTRY: </b>${res.country}<br><b>VPN: </b>${region.includes(res.countryCode) ? "false" : "true"}<br><b>LATITUDE: </b>${res.latitude}<br><b>LONGITUDE: </b>${res.longitude}`;
                console.log(res)

            });
        }
        net();
    }
} catch (e) {
    console.log("pass")
}
