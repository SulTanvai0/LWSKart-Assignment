"use client"
import { FacebookShare, TwitterShare, WhatsappShare } from "react-share-kit";


const SocialShare = ({ socialUrl, name }) => {
    return (
        <div className="flex gap-3 mt-4">
            <FacebookShare url={socialUrl} size="40px" round quote={name} />
            <TwitterShare url={socialUrl} size="40px" round quote={name} />
            <WhatsappShare url={socialUrl} size="40px" round quote={name} />
        </div>
    );
};

export default SocialShare;
