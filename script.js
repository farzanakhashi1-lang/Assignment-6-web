const partyData = [
    {
        floor: 2,
        rooms: [
            {
                name: "Balcony",
                guests: [
                    { name: "Aigerim", color: "green",  time: "20:45", aitu: true,  items: ["cup", "crumbs"] },
                    { name: "Aliya",   color: "black",  time: "21:15", aitu: false, items: ["phone", "cup"] },
                    { name: "Madina",  color: "green",  time: "22:10", aitu: false, items: ["phone", "bag", "crumbs"] },
                    { name: "Ivan",    color: "black",  time: "20:10", aitu: true,  items: ["cup"] }
                ]
            },
            {
                name: "Hall",
                guests: [
                    { name: "Arman",   color: "yellow", time: "20:35", aitu: false, items: ["bag", "glasses"] },
                    { name: "Sophia",  color: "purple", time: "21:20", aitu: true,  items: ["phone"] },
                    { name: "Dias",    color: "green",  time: "19:45", aitu: true,  items: [] },
                    { name: "Bekzat",  color: "purple", time: "20:55", aitu: false, items: ["bag", "cup", "crumbs"] },
                    { name: "Aruzhan", color: "blue",   time: "21:50", aitu: true,  items: ["phone"] },
                    { name: "Saule",   color: "green",  time: "21:25", aitu: false, items: ["glasses"] }
                ]
            }
        ]
    },
    {
        floor: 1,
        rooms: [
            {
                name: "Kitchen",
                guests: [
                    { name: "Nurlan",  color: "red",    time: "19:40", aitu: true,  items: ["phone", "cup"] },
                    { name: "Emma",    color: "black",  time: "20:15", aitu: false, items: ["bag"] },
                    { name: "Timur",   color: "green",  time: "21:05", aitu: true,  items: ["phone", "bag", "crumbs"] },
                    { name: "Sergey",  color: "yellow", time: "20:50", aitu: false, items: [] },
                    { name: "Yerlan",  color: "red",    time: "21:40", aitu: true,  items: ["glasses", "phone"] },
                    { name: "Kamila",  color: "green",  time: "20:05", aitu: false, items: ["cup"] }
                ]
            },
            {
                name: "Living room",
                guests: [
                    { name: "Daniel",  color: "blue",   time: "19:55", aitu: false, items: ["glasses"] },
                    { name: "Zarina",  color: "green",  time: "21:10", aitu: false, items: ["bag", "phone", "crumbs"] },
                    { name: "Natasha", color: "yellow", time: "20:30", aitu: true,  items: [] },
                    { name: "Askar",   color: "black",  time: "21:00", aitu: true,  items: ["phone"] },
                    { name: "Inkar",   color: "purple", time: "20:20", aitu: false, items: ["bag"] }
                ]
            }
        ]
    }
];

const ICONS = {
    phone:   '<rect x="7" y="3" width="10" height="18" rx="2"/>',
    glasses: '<circle cx="6" cy="14" r="3.5"/><circle cx="18" cy="14" r="3.5"/><path d="M9.5 14h5"/>',
    bag:     '<path d="M5 8h14l-1 13H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    cup:     '<path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z"/><path d="M16 10h2a2 2 0 0 1 0 4h-2"/><path d="M8 3v3M12 3v3"/>',
    crumbs:  '<path d="M4 20h16l-2-8H6z"/><path d="M6 12l6-6 6 6"/><path d="M9 16h.01M14 16h.01"/>',
    clock:   '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    cap:     '<path d="M2 9l10-5 10 5-10 5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>'
};

function icon(name) {
    return '<svg class="ic" viewBox="0 0 24 24">' + ICONS[name] + '</svg>';
}

function makeGuestCard(g) {
    const card = $("<div>")
        .addClass("guest c-" + g.color)
        .toggleClass("aitu", g.aitu)
        .attr({
            "data-name": g.name,
            "data-color": g.color,
            "data-time": g.time,
            "data-items": g.items.join(" ")
        });

    g.items.forEach(function (item) {
        card.addClass("has-" + item);
    });

    const avatar = $("<div>").addClass("avatar").append(
        $("<img>").attr({
            src: "https://api.dicebear.com/9.x/open-peeps/svg?seed=" + g.name,
            alt: g.name
        })
    );

    if (g.aitu) {
        avatar.append($("<span>").addClass("badge").html(icon("cap")));
    }

    card.append(
        avatar,
        $("<div>").addClass("name").text(g.name),
        $("<div>").addClass("time").html(icon("clock") + g.time),
        $("<div>").addClass("items").html(g.items.map(icon).join(""))
    );

    return card;
}

function buildPage() {
    const house = $("#house").empty();

    partyData.forEach(function (floorObj) {
        const floor = $("<div>").addClass("floor").attr("data-floor", floorObj.floor);
        const rooms = $("<div>").addClass("rooms");

        floorObj.rooms.forEach(function (roomObj) {
            const room = $("<div>").addClass("room").attr("data-room", roomObj.name);
            const guests = $("<div>").addClass("guests");

            roomObj.guests.forEach(function (g) {
                guests.append(makeGuestCard(g));
            });

            room.append($("<div>").addClass("room-title").text(roomObj.name), guests);

            if (roomObj.name === "Balcony") {
                room.append($("<div>").addClass("railing"));
            }

            rooms.append(room);
        });

        floor.append($("<div>").addClass("floor-label").text("FLOOR " + floorObj.floor), rooms);
        house.append(floor);
    });
}

const cases = [
    {
        num: 1, title: "Who is in the hall?",
        run: () => $(".room[data-room='Hall'] .guest")
    },
    {
        num: 2, title: "Who is dressed in yellow or purple?",
        run: () => $(".guest.c-yellow, .guest.c-purple")
    },
    {
        num: 3, title: "Which AITU students are upstairs?",
        run: () => $(".floor[data-floor='2'] .guest.aitu")
    },
    {
        num: 4, title: "Who has glasses or a bag?",
        run: () => $(".guest.has-glasses, .guest.has-bag")
    },
    {
        num: 5, title: "Who came with nothing at all?",
        run: () => $(".guest[data-items='']")
    },
    {
        num: 6, title: "Who has a phone but no bag?",
        run: () => $(".guest.has-phone:not(.has-bag)")
    },
    {
        num: 7, title: "Who arrived between 20:30 and 21:00?",
        run: () => $(".guest").filter(function () {
            const t = $(this).attr("data-time");
            return t >= "20:30" && t <= "21:00";
        })
    },
    {
        num: 8, title: "Who arrived after 21:00 and is not an AITU student?",
        run: () => $(".guest:not(.aitu)").filter(function () {
            return $(this).attr("data-time") > "21:00";
        })
    },
    {
        num: 9, title: "Who stands right next to Askar?",
        run: () => $(".guest[data-name='Askar']").prev().add(".guest[data-name='Askar'] + .guest")
    },
    {
        num: 10, title: "Who stands last in each room?",
        run: () => $(".guests .guest:last-child")
    },
    {
        num: 11, title: "Who stands third in each room?",
        run: () => $(".guests .guest:nth-child(3)")
    },
    {
        num: 12, title: "Who stands after Timur in his room?",
        run: () => $(".guest[data-name='Timur']").nextAll()
    },
    {
        num: 13, title: "Who stands right before someone in black?",
        run: () => $(".guest.c-black").prev()
    },
    {
        num: 14, title: "In which room is Aruzhan?", type: "rooms",
        run: () => $(".guest[data-name='Aruzhan']").closest(".room")
    },
    {
        num: 15, title: "Which rooms have fewer than 6 guests?", type: "rooms",
        run: () => $(".room").filter(function () {
            return $(this).find(".guest").length < 6;
        })
    },
    {
        num: 16, title: "Rooms with a cup but no glasses?", type: "rooms",
        run: () => $(".room:has(.has-cup):not(:has(.has-glasses))")
    },
    {
        num: 17, title: "Who came first to each room?",
        run: () => $(".guest").filter(function () {
            const t = $(this).attr("data-time");
            return $(this).siblings().filter(function () {
                return $(this).attr("data-time") < t;
            }).length === 0;
        })
    },
    {
        num: 18, title: "Miras comes and stands between Askar and Inkar",
        run: () => makeGuestCard({ name: "Miras", color: "blue", time: "21:20", aitu: true, items: ["phone"] })
            .hide()
            .insertAfter(".guest[data-name='Askar']")
            .fadeIn(800)
    },
    {
        num: 19, title: "Natasha goes home", noJump: true,
        run: () => $(".guest[data-name='Natasha']").fadeOut(800, function () {
            $(this).remove();
        })
    },
    {
        num: 20, title: "Who took the cake?",
        run: () => $(".floor[data-floor='1'] .guest.has-crumbs:not(.has-cup)")
            .filter(function () {
                const t = $(this).attr("data-time");
                return t > "21:00" && t < "21:30";
            })
            .filter(function () {
                return $(this).prev().hasClass("aitu") || $(this).next().hasClass("aitu");
            })
    }
];

function showResult(c, found) {
    if (c.type === "rooms") {
        found.addClass("found");
        $(".guest").not(found.find(".guest")).css("opacity", 0.2);
    } else {
        $(".guest").not(found).css("opacity", 0.2);
        if (!c.noJump) {
            found.animate({ top: "-12px" }, 150).animate({ top: "0px" }, 150);
        }
    }

    const names = found.map(function () {
        return $(this).attr(c.type === "rooms" ? "data-room" : "data-name");
    }).get().join(", ");

    $("#result-box").text("Case " + c.num + ". " + c.title + " → (" + found.length + "): " + (names || "None found"));
}

$(document).ready(function () {
    buildPage();

    $("[data-icon]").each(function () {
        $(this).html(icon($(this).attr("data-icon")));
    });

    cases.forEach(function (c) {
        $("<button>")
            .addClass("case-btn")
            .attr("data-case", c.num)
            .text(c.num + ". " + c.title)
            .appendTo("#case-buttons");
    });

    $("#btn-clear").on("click", function () {
        buildPage();
        $("#result-box").text("Click a case to see the result.");
    });

    $(".case-btn").on("click", function () {
        buildPage();
        const c = cases[$(this).attr("data-case") - 1];
        showResult(c, c.run());
    });
});