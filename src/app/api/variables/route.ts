import { Variable } from '@/types/types';

export let variables: Variable[] = [];

export async function GET() {
  return new Response(JSON.stringify(variables), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function POST(req: Request) {
  const variablesToAdd = await req.json();
  if (!Array.isArray(variablesToAdd)) {
    return new Response(JSON.stringify({ message: 'Invalid input format' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  if (variablesToAdd.length > 1) {
    variables = variablesToAdd;
  } else {
    variables.push(...variablesToAdd);
  }

  return new Response(JSON.stringify(variables), {
    status: 201,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();

  const index = variables.findIndex((variable) => variable.id === id);
  if (index === -1) {
    return new Response(JSON.stringify({ message: 'Variable not found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  variables.splice(index, 1);
  return new Response(JSON.stringify(variables), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function PUT(req: Request) {
  const { id, name, value } = await req.json();

  if (!id || !id.startsWith('#')) {
    return new Response(JSON.stringify({ message: 'Invalid ID format' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const index = variables.findIndex((variable) => variable.id === id);
  if (index === -1) {
    return new Response(JSON.stringify({ message: 'Variable not found' }), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  variables[index] = { id, name, value };

  return new Response(JSON.stringify(variables), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
