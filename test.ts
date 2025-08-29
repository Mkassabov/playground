function nanoid(size = 21) {
	const chars =
		"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-";
	let id = "";
	for (let i = 0; i < size; i++) {
		id += chars[Math.floor(Math.random() * chars.length)];
	}
	return id;
}

setInterval(() => {
	console.log(`patpat4 - ${nanoid()}`);
}, 500);
