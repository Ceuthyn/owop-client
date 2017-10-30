"use strict";
import { eventSys, PublicAPI } from './global.js';
import { propertyDefaults, storageEnabled } from './util/misc.js';
import toolSet from '../img/toolset.png';
import unloadedPat from '../img/unloaded.png';
import halloweenPat from '../img/halloween-pattern.png';
/* Important constants */

export let protocol = null;

/* The raw event ID numbers should NOT be used, instead import the EVENTS object in your file. */
let evtId = 0;

export const RANK = {
	NONE: 0,
	USER: 1,
	ADMIN: 2
};

PublicAPI.RANK = RANK;

export const EVENTS = {
	loaded: ++evtId,
	init: ++evtId,
	tick: ++evtId,
	misc: {
		toolsRendered: ++evtId,
		toolsInitialized: ++evtId,
		logoMakeRoom: ++evtId,
		worldInitialized: ++evtId,
		windowAdded: ++evtId,
		captchaToken: ++evtId
	},
	renderer: {
		addChunk: ++evtId,
		rmChunk: ++evtId,
		updateChunk: ++evtId
	},
	camera: {
		zoom: ++evtId /* (zoom value), note that this event should not be used to SET zoom level. */
	},
	net: {
		connecting: ++evtId,
		connected: ++evtId,
		disconnected: ++evtId,
		playerCount: ++evtId,
		chat: ++evtId,
		devChat: ++evtId,
		world: {
			leave: ++evtId,
			join: ++evtId, /* (worldName string) */
			joining: ++evtId, /* (worldName string) */
			setId: ++evtId,
			playersMoved: ++evtId, /* (Object with all the updated player values) */
			playersLeft: ++evtId,
			tilesUpdated: ++evtId,
			teleported: ++evtId
		},
		chunk: {
			load: ++evtId, /* (Chunk class) */
			unload: ++evtId, /* (x, y) */
			set: ++evtId /* (x, y, data), backwards compat */
		},
		sec: {
			rank: ++evtId
		}
	}
};

export const options = propertyDefaults(storageEnabled() && JSON.parse(localStorage.getItem('owopOptions') || '{}'), {
	serverAddress: [{
		default: true,
		title: 'Official server',
		proto: 'old',
		url: 'ws://ourworldofpixels.com:443'
	},{
		default: false,
		title: 'Localhost',
		proto: 'old',
		url: 'ws://localhost:25565'
	}], // The server address that websockets connect to
	fps: 30, // Fps used if requestAnimationFrame is not supported (not used atm)
	netUpdateSpeed: 20, // How many times per second to send updates to server
	tickSpeed: 30, // How many times per second to run a tick
	movementSpeed: 30,
	defaultZoom: 16,
	zoomStrength: 1,
	zoomLimitMin: 1,
	zoomLimitMax: 32,
	unloadDistance: 30,
	toolSetUrl: toolSet,
	unloadedPatternUrl: unloadedPat,
	backgroundUrl: halloweenPat
});

PublicAPI.options = options;

eventSys.on(EVENTS.net.connecting, server => {
	protocol = server.proto;
});
