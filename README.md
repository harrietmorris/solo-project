# solo-project

Run npm install to download dependancies.

I used the expo go ios simulator to view my app. 

I ran npx expo start, then selected i to view in ios (you will need to download the simulator). Alternatively you can download the expo go app on your mobile, and use your camera to scan the QR code.

If you have issues, you may need to change the API_URL (in surfProject/app/service/ApiService) to your computers local ip address. To find your local IP, type "ifconfig" in your terminal, and search for your active network connection (usually labelled 'en0' or 'en1').

Currently this app is not set up for android. I hope in future I can enable an environment variable for android and ios.
