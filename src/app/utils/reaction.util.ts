export function updateReaction(reaction: 'LIKE' | 'DISLIKE', liked: boolean, reactionCount: number) {
    if (liked) {
        if (reaction === 'LIKE') {
            return {
                liked: undefined,
                reaction: reactionCount - 1
            };
        } else {
            return {
                liked: false,
                reaction: reactionCount - 2
            };
        }
    } else if (liked === false) {
        if (reaction === 'LIKE') {
            return {
                liked: true,
                reaction: reactionCount + 2
            };
        } else {
            return {
                liked: undefined,
                reaction: reactionCount + 1
            };
        }
    } else {
        const newReactionIsLike = reaction === 'LIKE';
        return {
            liked: newReactionIsLike,
            reaction: newReactionIsLike ? reactionCount + 1 : reactionCount - 1
        };
    }
}