"use client";

export default function FooterContact({ info }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
      <ul className="space-y-2">
        <li>
          <span className="font-semibold">Mobile: </span>
          {info.Mobile}
        </li>
        <li>
          <span className="font-semibold">Email: </span>
          {info.Email}
        </li>
      </ul>
    </div>
  );
}
