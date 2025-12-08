import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

// Route segment config
export const runtime = 'nodejs';

// Image metadata
export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
    const fontData = readFileSync(join(process.cwd(), 'public/fonts/Monoton-Regular.ttf'));

    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 24,
                    background: 'black',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FF5500',
                    fontFamily: 'Monoton',
                    borderRadius: '40%',
                }}
            >
                S
            </div>
        ),
        {
            ...size,
            fonts: [
                {
                    name: 'Monoton',
                    data: fontData,
                    style: 'normal',
                    weight: 400,
                },
            ],
        }
    );
}
