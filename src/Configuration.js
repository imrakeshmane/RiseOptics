import moment from "moment";

export const Configuration = {
  home: {
    tab_bar_height: 50,
    initial_show_count: 4,
    listing_item: {
      height: 130,
      offset: 15,
      saved: {
        position_top: 5,
        size: 25
      }
    }
  },
  map: {
    origin: {
      latitude: 0,
      longitude: 0
    },
    delta: {
      latitude: 0,
      longitude: 0
    }
  },
  timeFormat: postTime => {
    time = "";
    if (postTime) {
      time = moment(postTime).fromNow();
    }
    // time = postTime.toUTCString();
    return time;
  }
};
