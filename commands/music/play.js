module.exports = [{

name: "c-play", 

code: `Created \`/play\` command.

$createApplicationCommand[$guildID;play;play music via youtube;true;slash;song:please insert a link or enter song name:true:3]`

},	{name: "play",

type: 'interaction', 

prototype: 'slash', 

$if: 'v4', 

code: `

$if[$voiceID[$authorID]==]

$interactionReply[join to a voice channel first.;;;;;yes]

$elseif[$voiceID[$clientID]==]

$interactionFollowUp[;{newEmbed:{description:“$get[song]” to queue.}{color:CCB0B0}{footer:$randomText[enjoy~;music heals!;feel the music!]}}]

$let[song;$playTrack[youtube;$slashOption[song]]]

$interactionDefer

$wait[1s]

$joinVC

$endelseif

$else

$interactionFollowUp[;{newEmbed:{description:“$get[song]” to queue.}{color:CCB0B0}{footer:$randomText[enjoy~;music heals!;feel the music!]}]

$let[song;$playTrack[soundcloud;$slashOption[song]]]

$interactionDefer

$endif`

}]
