// 네비게이션 관리 파일


// Account
export const goLogin = () => {
    window.location.replace('/#/login');
}

export const goRegister = () => {
    window.location.replace('/#/register');
}

// Header
export const goMyPage = (id) => {
    window.location.replace(`/#/my-page/user/${id}`);
}


export const goEntry = () => {
    window.location.replace(`/#`);
}

// Draft
export const goDraftDetail = (id) => {
    window.location.replace(`/#/draft/${id}/detail`);
}

export const goDraftList = () => {
    window.location.replace('/#/drafts/best');
}

export const goDraftEdit = (id) => {
    window.location.replace(`/#/draft/${id}/edit`);
}

export const goUpload = () => {
    window.location.replace(`/#/upload/draft`);
}

export const goDraftScalp = () => {
    window.location.replace('/#/drafts/best/scalp');
}

export const goDraftEyebrow = () => {
    window.location.replace('/#/drafts/best/eyebrow');
}
// Artwork
export const goArtworkDetail = (id, tattooist_id) => {
    window.location.replace(`/#/artwork/${id}/${tattooist_id}`);
}

// Tattooist
export const goTattooistDetail = (id) => {
    window.location.replace(`/#/tattooist/${id}/draft`);
}

export const goTattooistReservation = (id) => {
    window.location.replace(`/#/tattooist/${id}/reservation`);
}


// Edit
export const goEdit = () => {
    window.location.replace(`/#/edit/image`);
}

// Chatting
export const goChatting = (id) => {
    window.location.replace(`/#/chat/${id}`);
}

export const goChattingRoom = (id, reserv_id) => {
    window.location.replace(`/#/chat/${id}/${reserv_id}/room`);
}

export const goChattingReserv = (id, reserv_id) => {
    window.location.replace(`/#/chat/${id}/${reserv_id}/reservation`);
}

// Reservation 
export const goReservConfirm = () => {
    window.location.replace(`/#/reservations/confirmed`);
}

export const goReservPending = () => {
    window.location.replace(`/#/reservations/pending`);
}

// Auction

export const goAuctionList = () => {
    window.location.replace(`/#/auction/all`);
}

export const goAuctionDetail = (id) => {
    window.location.replace(`/#/auction/${id}`);
}

export const goAuctionUpload = () => {
    window.location.replace(`/#/upload/auction`);
}

export const goBidderUpload = (id) => {
    window.location.replace(`/#/upload/auction/${id}`)
}